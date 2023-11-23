'use client'

import { MouseEvent, useEffect, useState } from 'react'
import { useApplication } from '../hooks/useApplication'
import { useApiUrl } from '../hooks/useApiUrl'
import { Address } from '../types/Address'
import { Vehicle } from '../types/Vehicle'
import { useRouter } from 'next/navigation'
import { Breadcrumbs } from './Breadcrumbs'
import { MessageCard } from './MessageCard'

type FormFields = {
  firstName?: string
  lastName?: string
  birthdate?: string
}

export const ReviewForm = () => {
  const router = useRouter()
  const [message, setMessage] = useState<string>('')
  const [application, setApplication] = useApplication()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [addresses, setAddresses] = useState<Address[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const apiUrl = useApiUrl()

  useEffect(() => {
    const existingAddresses = application?.addresses ?? []
    const existingVehicles = application?.vehicles ?? []
    setFirstName(application?.firstName ?? '')
    setLastName(application?.lastName ?? '')
    setBirthdate(application?.birthdate ?? '')
    setAddresses(existingAddresses)
    setVehicles(existingVehicles)
  }, [application])

  const formSubmitted = (e: MouseEvent<HTMLButtonElement>) => {
    if (!application) {
      throw new Error('Application is not defined')
    }
    if (firstName.length === 0) {
      setMessage('First name must be provided!')
      return
    }
    if (lastName.length === 0) {
      setMessage('Last name must be provided!')
      return
    }
    if (birthdate.length === 0) {
      setMessage('Birthdate must be provided!')
      return
    }
    if (addresses.length === 0) {
      setMessage('An address must be provided!')
      return
    }
    if (vehicles.length < 1 || vehicles.length > 3) {
      setMessage('Between one and three vehicles must be provided!')
      return
    }

    const url = `${apiUrl}/applications/${application.id}/submit`
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => response.json())
    .then((data) => {
      setApplication(data)
      router.push('/application/page/5')
    })
  }

  return (
    <form className="py-6">
      <Breadcrumbs step={4} />
      <MessageCard message={message} />
      <table className="table-auto mb-6 w-full">
        <tbody className="bg-white dark:bg-slate-800">
          <tr>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 font-bold dark:text-slate-400">First Name</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{firstName}</td>
          </tr>
          <tr>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 font-bold dark:text-slate-400">Last Name</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{lastName}</td>
          </tr>
          <tr>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 font-bold dark:text-slate-400">Birthdate</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{new Date(birthdate).toLocaleDateString()}</td>
          </tr>
          {
            addresses[0]
            ? (              
              <tr>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 font-bold dark:text-slate-400">Address</td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                  <>{addresses[0].street}</><br />
                  <>{addresses[0].city}</><br />
                  <>{addresses[0].state}</><br />
                  <>{addresses[0].zipcode}</>
                </td>
              </tr>
            )
            : (
              null
            )
          }
          {
            vehicles.length > 0
            ? (              
              vehicles.map((vehicle, i) => {
                return (
                  <tr key={i}>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 font-bold dark:text-slate-400">Vehicle #<>{i + 1}</></td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      <>{vehicle.year}</>{' '}
                      <>{vehicle.make}</>{' '}
                      <>{vehicle.model}</>{' '}
                      (<>{vehicle.vin}</>)
                    </td>
                  </tr>
                )
              })
            )
            : (
              null
            )
          }
        </tbody>
      </table>
      <button type="button" onClick={formSubmitted} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Finish</button>
    </form>
  )
}
