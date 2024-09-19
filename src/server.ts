import fastify from 'fastify'
import { SqliteHelper } from './database'

const app = fastify()

app.get('/hello', async () => {
  const transactions = await SqliteHelper('transactions')
    .where('amount', 1000)
    .select('*')

  return transactions
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running on port 3333.')
  })
