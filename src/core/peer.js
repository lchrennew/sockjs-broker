import Announcer from './announcer.js';
import { getLogger } from "es-get-logger";

/**端点*/
export default class Peer {
    logger = getLogger('peer.js')

    connection;
    channel;
    announcer;

    constructor(channel, connection) {
        this.channel = channel;
        this.connection = connection;
        this.announcer = new Announcer(channel);
    }

    /**接入端点*/
    connect = () => {
        this.logger.info(`Peer connected`)
        this.connection
            .on('close', this.close)
            .on('data', this.announce);
        this.channel.on('msg', this.remember)
    };

    /**关闭端点*/
    close = () => {
        this.logger.info(`Close`)
        this.channel.off('msg', this.remember);
        this.connection.destroy()
    };

    /**从服务器记录消息*/
    remember = msg => {
        this.logger.info(`Remember ${msg}`)
        this.connection.write(JSON.stringify({ msg, t: new Date().valueOf() }));
    }

    /**向服务器发布消息*/
    announce = msg => {
        this.logger.info(`Announce ${msg}`)
        this.announcer.announce(msg)
    }
}
