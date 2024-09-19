import fastify from 'fastify'
import { SqliteHelper } from './database'

const app = fastify()

app.get('/hello', async () => {
  const tables = await SqliteHelper('sqlite_schema').select('*')

  return tables
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running on port 3333.')
  })
