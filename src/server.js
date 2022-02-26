import PubController from './controllers/pub-controller.js';
import { startServer } from "koa-es-template";
import { queue } from "./utils/queue.js";

const { server } = await startServer({ index: PubController })
queue.start(server);
