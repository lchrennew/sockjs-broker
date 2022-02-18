import sock from 'sockjs';
import { remember } from '../scaling/index.js';
import Announcer from './Announcer.js';
import MultiplexServer from './MultiplexServer.js';
import Peer from './Peer.js';
import { getLogger } from "es-get-logger";


/**
 * 队列服务器
 * */
export default class QueueServer {

    ws;
    multiplexer;
    channels = {};
    logger = getLogger('QueueServer')

    /**
     * 启动队列服务器
     * @param server http服务器
     * */
    start(server) {
        this.ws = sock.createServer({ disconnect_delay: 10 });
        this.multiplexer = new MultiplexServer(this.ws);
        this.ws.installHandlers(server, { prefix: '/queues' });
        this.ws.on('requireChannel', (topic, conn) => this.getChannel(topic).emit('connection', conn))
        this.logger.info('scaling.remember')
        remember(this)
    }

    /**
     * 获取指定主题频道，并注册不存在的主题频道
     * @param topic {string} 主题名
     * */
    getChannel(topic) {
        let channel = this.channels[topic];
        if (!(topic in this.channels)) {
            channel = this.multiplexer.registerChannel(topic)
                .on('connection', connection => new Peer(channel, connection).connect());
            this.channels[topic] = channel;
        }
        return channel
    }

    /**
     * 向特定主题频道发布消息
     * @param topic {String} 目标主题名
     * @param msg {Object} 消息
     * */
    publish(topic, msg) {
        this.logger.info(`Publish message to topic ${topic}:`)
        this.logger.info(JSON.stringify(msg))
        return new Announcer(this.getChannel(topic)).announce(msg);
    }
}
