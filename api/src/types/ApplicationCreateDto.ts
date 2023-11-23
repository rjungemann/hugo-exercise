export type ApplicationCreateDto = {
  firstName?: string,
  lastName?: string,
  birthdate?: string,
  addresses?: {
    street: string,
    city: string,
    state: string,
    zipcode: string
  }[],
  vehicles?: {
    vin: string,
    year: string,
    make: string,
    model: string
  }[]
}
