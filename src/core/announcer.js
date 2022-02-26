import { getLogger } from "koa-es-template";

const logger = getLogger('announcer.js')

export default class Announcer {
    channel;

    constructor(channel) {
        this.channel = channel
    }

    announce = msg => {
        logger.info(`Announce message in process:`)
        logger.info(msg)
        this.channel.emit('msg', msg)
    }
}
