import { getRedis } from '../utils/redis.js';
import { getLogger } from "es-get-logger";

const logger = getLogger('scaling/index.js')
const scaled = process.env.QUEUE_ANNOUNCE_STRATEGY === 'SCALED'
const channel = process.env.REDIS_CHANNEL ?? 'eb-queue'
const subscriber = scaled ? getRedis() : null;
const publisher = scaled ? getRedis() : null;
logger.info(`Subscribe ${channel}`)
subscriber?.subscribe(channel)


export function announce(topic, msg) {
    logger.info('send message to redis')
    publisher?.publish(channel, JSON.stringify({ topic, msg }))
}

export function remember(server) {
    subscriber?.on('message', (_, message) => {
        const { topic, msg } = JSON.parse(message)
        logger.info(`Received message from redis:`, message)
        server.getChannel(topic).emit('msg', msg)
    })
}
