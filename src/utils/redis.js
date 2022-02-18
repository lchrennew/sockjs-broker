import { RedisURL } from "es-ioredis-url";

const url = new RedisURL()
export const getRedis = () => url.getRedis()
