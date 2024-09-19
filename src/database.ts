import 'dotenv/config'
import knex from 'knex'
import { Knex } from 'knex'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not found.')
}

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: process.env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const SqliteHelper = knex(config)
