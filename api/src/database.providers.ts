
import { DataSource } from 'typeorm'
import constants from './constants'

export const databaseProviders = [
  {
    provide: constants.DATA_SOURCE,
    useFactory: async () => {
      const databaseUrl = process.env.DATABASE_URL
      if (!databaseUrl) {
        throw new Error('DATABASE_URL must be provided')
      }

      const dataSource = new DataSource({
        type: 'postgres',
        url: databaseUrl,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      })

      return dataSource.initialize()
    },
  },
]
