import { DataSource } from 'typeorm'
import { Address } from './address.entity'
import constants from '../../constants'

export const addressProviders = [
  {
    provide: constants.ADDRESS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Address),
    inject: [constants.DATA_SOURCE],
  },
]
