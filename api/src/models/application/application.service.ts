
import { Injectable, Inject, Post } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Application } from './application.entity';
import constants from '../../constants';
import { ApplicationCreateDto } from 'src/types/ApplicationCreateDto';
import { Address } from 'src/models/address/address.entity';
import { validate } from 'class-validator';
import { Vehicle } from 'src/models/vehicle/vehicle.entity';
import { ApplicationPutDto } from 'src/types/ApplicationPutDto';
import { ApplicationSubmitDto } from 'src/types/ApplicationSubmitDto';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject(constants.APPLICATION_REPOSITORY)
    private applicationRepository: Repository<Application>,
    @Inject(constants.ADDRESS_REPOSITORY)
    private addressRepository: Repository<Address>,
    @Inject(constants.VEHICLE_REPOSITORY)
    private vehicleRepository: Repository<Address>,
    @Inject(constants.DATA_SOURCE)
    private dataStore: DataSource
  ) {}

  async findAll(): Promise<Application[]> {
    return this.applicationRepository.find()
  }

  async find(id: number): Promise<Application | null> {
    return this.applicationRepository.findOneBy({ id })
  }

  async create(body: ApplicationCreateDto): Promise<Application> {
    let id: number | undefined
    await this.dataStore.transaction(async (transactionalEntityManager) => {
      const application: Application = new Application()
      if (body.firstName) {
        application.firstName = body.firstName
      }
      if (body.lastName) {
        application.lastName = body.lastName
      }
      if (body.birthdate) {
        application.birthdate = new Date(body.birthdate)
      }
      // Insert the record
      const result = await this.applicationRepository.insert(application)
      // Retrieve the ID from the newly-created record
      id = result.identifiers[0]?.id
      if (!id) {
        throw new Error('could not find inserted record.')
      }

      if (body?.addresses?.length > 0) {
        // Create address record object
        const address: Address = new Address()
        const bodyAddress = body.addresses[0]
        address.application = application
        address.street = bodyAddress.street
        address.state = bodyAddress.state
        address.city = bodyAddress.city
        address.zipcode = bodyAddress.zipcode
        {
          // Validate address
          const errors = await validate(address)
          if (errors.length > 0) {
            console.error(errors)
            throw new Error('could not validate user data for creation')
          }
          // Insert address
          const result = await this.addressRepository.insert(address)
          if (!result.identifiers[0]?.id) {
            throw new Error('could not find inserted record.')
          }
        }
        // Add to the application for validation
        application.addresses = [address]
      }

      if (body?.vehicles?.length > 0) {
        // Create vehicle record objects
        const vehicles = body.vehicles.map((v) => {
          const vehicle = new Vehicle()
          vehicle.application = application
          vehicle.vin = v.vin
          vehicle.year = v.year
          vehicle.make = v.make
          vehicle.model = v.model
          return vehicle
        })
        // Validate vehicles
        await Promise.all(vehicles.map(async (vehicle) => {
          const vehicleErrors = await validate(vehicle)
          if (vehicleErrors.length > 0) {
            console.error(vehicleErrors)
            throw new Error('could not validate user data for creation')
          }
        }))
        // Insert vehicle and make sure we get an ID back for the newly created record
        await Promise.all(vehicles.map(async (vehicle) => {
          const result = await this.vehicleRepository.insert(vehicle)
          if (!result.identifiers[0]?.id) {
            throw new Error('could not find inserted record.')
          }
        }))
        // Add to the application for validation
        application.vehicles = vehicles
      }

      // Validate application
      const errors = await validate(application)
      if (errors.length > 0) {
        console.error(errors)
        throw new Error('could not validate user data for creation')
      }
    })

    // Query the application, with its nested objects, and return it
    return this.applicationRepository.findOne({ where: { id }})
  }

  async put(body: ApplicationPutDto): Promise<Application> {
    const id = body.id
    await this.dataStore.transaction(async (transactionalEntityManager) => {
      const application = await this.applicationRepository.findOne({ where: { id }})
      if (!application) {
        throw new Error('no existing application found.')
      }
      // Update application fields
      if (body.firstName) {
        application.firstName = body.firstName
      }
      if (body.lastName) {
        application.lastName = body.lastName
      }
      if (body.birthdate) {
        application.birthdate = new Date(body.birthdate)
      }
      // Save the application
      await this.applicationRepository.save(application)

      // Consider address to be a single field
      if (body?.addresses?.length > 0) {
        // Find an existing address, or create a new one
        const existingAddress = await this.addressRepository.findOne({ where: { application }})
        const address = existingAddress ?? new Address()
        const bodyAddress = body.addresses[0]
        // Update address fields
        address.application = application
        address.street = bodyAddress.street
        address.city = bodyAddress.city
        address.state = bodyAddress.state
        address.zipcode = bodyAddress.zipcode
        // Validate address
        const errors = await validate(address)
        if (errors.length > 0) {
          console.error(errors)
          throw new Error('could not validate user data for creation')
        }
        // Save address
        await this.addressRepository.save(address)
      }

      // Consider vehicles to be a single field
      if (body?.vehicles?.length > 0) {
        // Clear existing vehicles
        const existingVehicles = await this.vehicleRepository.find({ where: { application }})
        await this.vehicleRepository.remove(existingVehicles)
        // Create vehicle record objects
        const vehicles = body.vehicles.map((v) => {
          const vehicle = new Vehicle()
          vehicle.application = application
          vehicle.vin = v.vin
          vehicle.year = v.year
          vehicle.make = v.make
          vehicle.model = v.model
          return vehicle
        })
        // Validate vehicles
        if (vehicles.length < 1 || vehicles.length > 3) {
          throw new Error('must have 1-3 cars')
        }
        await Promise.all(vehicles.map(async (vehicle) => {
          const vehicleErrors = await validate(vehicle)
          if (vehicleErrors.length > 0) {
            console.error(vehicleErrors)
            throw new Error('could not validate user data for creation')
          }
        }))
        // Insert vehicle and make sure we get an ID back for the newly created record
        await Promise.all(vehicles.map(async (vehicle) => {
          const result = await this.vehicleRepository.insert(vehicle)
          if (!result.identifiers[0]?.id) {
            throw new Error('could not find inserted record.')
          }
        }))
      }
    })

    // Query the application, with its nested objects, and return it
    return this.applicationRepository.findOne({ where: { id }})
  }

  async submit(body: ApplicationSubmitDto): Promise<Application> {
    const id = body.id
    await this.dataStore.transaction(async (transactionalEntityManager) => {
      const application = await this.applicationRepository.findOne({ where: { id }})
      // Validate application
      if (!application.firstName) {
        throw new Error('firstName not provided')
      }
      if (!application.lastName) {
        throw new Error('lastName not provided')
      }
      if (!application.birthdate) {
        throw new Error('birthdate not provided')
      }

      // Validate address
      if (application.addresses.length < 1) {
        throw new Error('address must be provided')
      }
      const address = application.addresses[0]
      if (!address.street) {
        throw new Error('a street for an address must be provided')
      }
      if (!address.city) {
        throw new Error('a city for an address must be provided')
      }
      if (!address.state) {
        throw new Error('a state for an address must be provided')
      }
      if (!address.zipcode) {
        throw new Error('a zipcode for an address must be provided')
      }

      // Validate vehicles
      if (application.vehicles.length < 1 || application.vehicles.length > 3) {
        throw new Error('application must have 1-3 vehicles')
      }
      application.vehicles.forEach((vehicle) => {
        if (!vehicle.vin) {
          throw new Error('a vehicle vin must be provided')
        }
        if (!vehicle.year) {
          throw new Error('a vehicle year must be provided')
        }
        if (!vehicle.make) {
          throw new Error('a vehicle make must be provided')
        }
        if (!vehicle.model) {
          throw new Error('a vehicle model must be provided')
        }
      })

      application.submitted = true
      await this.applicationRepository.save(application)
    })
    return this.find(id)
  }
}
