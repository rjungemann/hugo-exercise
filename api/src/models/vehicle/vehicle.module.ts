
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../database.module'
import { vehicleProviders } from './vehicle.providers'

@Module({
  imports: [DatabaseModule],
  providers: [...vehicleProviders],
  exports: [...vehicleProviders],
})
export class VehicleModule {}
