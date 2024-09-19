import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { SqliteHelper } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await SqliteHelper('transactions').select('*')

    return {
      transactions: transactions,
    }
  })

  app.get('/:id', async (request) => {
    const getTransactionById = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionById.parse(request.params)

    const transaction = await SqliteHelper('transactions')
      .where('id', id)
      .first()

    return {
      transaction,
    }
  })

  app.get('/summary', async () => {
    const transactions = await SqliteHelper('transactions')
      .sum('amount', { as: 'balance' })
      .first()

    return {
      summary: transactions,
    }
  })

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    await SqliteHelper('transactions').insert({
      id: randomUUID(),
      title: title,
      amount: type == 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send('Transaction created successfuly.')
  })
}
