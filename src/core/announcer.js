import { getLogger } from "es-get-logger";

export default class Announcer {
    channel;
    logger = getLogger('announcer.js')

    constructor(channel) {
        this.channel = channel
    }

    announce = msg => {
        this.logger.info(`Announce message in process:`)
        this.logger.info(msg)
        this.channel.emit('msg', msg)
    }
}
