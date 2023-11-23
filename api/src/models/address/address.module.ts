
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../database.module'
import { addressProviders } from './address.providers'

@Module({
  imports: [DatabaseModule],
  providers: [...addressProviders],
  exports: [...addressProviders],
})
export class AddressModule {}
