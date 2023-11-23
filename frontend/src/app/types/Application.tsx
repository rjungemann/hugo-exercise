import { Address } from "./Address"
import { Vehicle } from "./Vehicle"

export type Application = {
  id?: number
  firstName?: string
  lastName?: string
  birthdate?: string
  addresses: Address[]
  vehicles: Vehicle[]
}