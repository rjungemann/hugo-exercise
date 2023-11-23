
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../database.module'
import { applicationProviders } from './application.providers'
import { databaseProviders } from '../../database.providers'

@Module({
  imports: [DatabaseModule],
  providers: [...databaseProviders, ...applicationProviders],
  exports: [...databaseProviders, ...applicationProviders],
})
export class ApplicationModule {}
