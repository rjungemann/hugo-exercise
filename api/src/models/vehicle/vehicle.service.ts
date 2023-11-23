
import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Vehicle } from './vehicle.entity'
import constants from '../../constants'

@Injectable()
export class ApplicationService {
  constructor(
    @Inject(constants.VEHICLE_REPOSITORY)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }
}
