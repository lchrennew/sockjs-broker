import RedisURL from './redisUrl.js';

const url = new RedisURL()
export const getRedis = () => url.getRedis()
