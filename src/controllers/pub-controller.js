import { Controller } from "koa-es-template";
import { queue } from "../utils/queue.js";

export default class PubController extends Controller{

    constructor(config) {
        super(config);
        this.post('/publish/:topic', async ctx => {
            queue.publish(ctx.params.topic, ctx.request.body);
            ctx.status = 204
        })

        this.post('/publish', async ctx => {
            const {topic} = ctx.query
            queue.publish(topic, ctx.request.body);
            ctx.status = 204
        })

        this.get('/channels', async ctx => {
            ctx.body = queue.channels
        })
    }
}
