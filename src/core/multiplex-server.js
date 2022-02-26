import { EventEmitter } from 'events';
import { announce } from '../scaling/index.js';
import Channel from './channel.js';
import { getLogger } from 'koa-es-template'

const COMMA = ','
const logger =  getLogger('multiplex-server.js')

/**多工服务器*/
export default class MultiplexServer {

    registeredChannels = {};
    ws;

    /**
     * 基于SockJs的多工服务器
     * @param ws SockJs服务
     * */
    constructor(ws) {
        this.ws = ws;
        const multiplex = {
            'uns': (channels, topic, sub) => {
                logger.info(`Unsubscribe ${topic}`)
                delete channels[topic];
                sub.emit('close')
            },
            'msg': (channels, topic, sub, payload) => {
                logger.info(`Publish ${payload} --> ${topic}`)
                if (process.env.QUEUE_ANNOUNCE_STRATEGY === 'SCALED') {
                    announce(topic, payload)
                } else {
                    sub.emit('data', payload)
                }
            },
            'sub': (channels, topic, sub) => {
                logger.info(`Subscribe ${topic}`)
                if (!(topic in this.registeredChannels)) {
                    logger.info(`Registering and connect to topic ${topic}`)
                    this.ws.emit('requireChannel', topic, sub)
                } else {
                    logger.info(`Connect to topic ${topic}`)
                    this.registeredChannels[topic].emit('connection', sub)
                }
            },
        };


        ws.on('connection', conn => {
            const [ server, sessionId ] = conn.pathname.substr(conn.prefix.length + 1).split('/')
            const clientId = [ server, sessionId ].join('')
            logger.info('Connected:', clientId)
            let channels = {};

            //  订阅、取消订阅、接收消息
            conn.on('data', message => {
                logger.info(`Received message: ${message}`)
                let t = message.split(COMMA);
                let type = t.shift(), topic = t.shift(), payload = t.join(COMMA);
                const proc = multiplex[type];
                if (proc) {
                    let sub = channels[topic] ?? (channels[topic] = new Channel(conn, topic, channels));
                    proc(channels, topic, sub, payload);
                }
            });
            conn.on('close', () => {
                for (const topic in channels) {
                    channels[topic].emit('close');
                }
                channels = {};
                logger.info('Closed')
            });
        })
    }

    registerChannel = name => this.registeredChannels[escape(name)] = new EventEmitter();
}
