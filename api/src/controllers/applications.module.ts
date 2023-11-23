import { Module } from '@nestjs/common'
import { ApplicationModule } from '../models/application/application.module'
import { ApplicationsController } from './applications.controller'
import { ApplicationService } from '../models/application/application.service'
import { VehicleModule } from '../models/vehicle/vehicle.module'
import { AddressModule } from '../models/address/address.module'

@Module({
  imports: [ApplicationModule, AddressModule, VehicleModule],
  controllers: [ApplicationsController],
  providers: [ApplicationService],
})
export class ApplicationsModule {}
