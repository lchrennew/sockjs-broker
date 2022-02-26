import PubController from './controllers/pub-controller.js';
import { getLogger, startServer } from "koa-es-template";
import { queue } from "./utils/queue.js";

const logger = getLogger('server.js')
logger.info(`-- STARTING SERVER --`)

const { server } = await startServer({ index: PubController })
queue.start(server);
