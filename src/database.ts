import knex from 'knex'

export const SqliteHelper = knex({
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db',
  },
})
