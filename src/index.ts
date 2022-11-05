import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

export interface Env {
    DB: D1Database
    // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
    // MY_KV_NAMESPACE: KVNamespace;
    //
    // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
    // MY_DURABLE_OBJECT: DurableObjectNamespace;
    //
    // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
    // MY_BUCKET: R2Bucket;
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', logger())
app.use('*', poweredBy())
app.use('*', cors())
app.use('*', prettyJSON({ space: 2 }))

app.get('/', (c) => {
    return c.text('Call /api to see everyone who works at Bs Beverages')
})

app.get('/api', async (c) => {
    const { pathname } = new URL(c.req.url)

    try {
        const { results } = await c.env.DB.prepare('SELECT * FROM Customers WHERE CompanyName = ?')
            .bind('Bs Beverages')
            .all()
        return c.json(results)
    } catch (err) {
        return c.json({ message: `Something wrong: ${err}` })
    }
})

export default app
