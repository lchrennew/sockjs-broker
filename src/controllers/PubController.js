import QueueServer from '../core/QueueServer.js';

export default function (router, queue) {
    router.post('/publish/:topic', async ctx => {
        queue.publish(ctx.params.topic, ctx.request.body);
        ctx.status = 200
    })

    router.get('/channels', async ctx => {
        ctx.body = queue.channels
    })
}
