import cors from '@koa/cors'
import Router from '@koa/router'
import http from 'http';
import Koa from 'koa'
import body from 'es-koa-body'
import PubController from './controllers/PubController.js';
import QueueServer from './core/index.js';
import { getLogger } from "es-get-logger";

const logger = getLogger('server.js')
logger.info(`-- STARTING SERVER --`)

const app = new Koa();
const port = Number(process.env.PORT) || 9999;
const router = new Router();
const queue = new QueueServer();
PubController(router, queue);

app
    .use(cors({ credentials: 'include' }))
    .use(body())
    .use(router.routes())
    .use(router.allowedMethods());

const server = http.createServer(app.callback());
queue.start(server);
server.listen(port, '0.0.0.0');

logger.info(`started listening on ${port}`);
