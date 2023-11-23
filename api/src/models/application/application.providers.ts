import { DataSource } from 'typeorm'
import { Application } from './application.entity'
import constants from '../../constants'

export const applicationProviders = [
  {
    provide: constants.APPLICATION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Application),
    inject: [constants.DATA_SOURCE],
  },
]
