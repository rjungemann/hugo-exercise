import { DataSource } from 'typeorm'
import { Vehicle } from './vehicle.entity'
import constants from '../../constants'

export const vehicleProviders = [
  {
    provide: constants.VEHICLE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Vehicle),
    inject: [constants.DATA_SOURCE],
  },
]
