import { FastifyInstance } from 'fastify'
import { SqliteHelper } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
    const transactions = await SqliteHelper('transactions')
      .where('amount', 1000)
      .select('*')

    return transactions
  })
}
