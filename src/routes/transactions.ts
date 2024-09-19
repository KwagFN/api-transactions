import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { SqliteHelper } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    await SqliteHelper('transactions').insert({
      id: randomUUID(),
      title: title,
      amount: type == 'credit' ? amount : amount * -1,
      session_id: randomUUID(),
    })

    return reply.status(201).send('Transaction created successfuly.')
  })
}
