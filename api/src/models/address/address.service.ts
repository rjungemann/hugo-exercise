
import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Address } from './address.entity'
import constants from '../../constants'

@Injectable()
export class AddressService {
  constructor(
    @Inject(constants.ADDRESS_REPOSITORY)
    private addressRepository: Repository<Address>,
  ) {}

  async findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }
}
