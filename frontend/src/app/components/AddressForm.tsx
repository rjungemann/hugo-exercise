'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, MouseEvent, useLayoutEffect, useState } from 'react'
import { useApplication } from '../hooks/useApplication'
import { useApiUrl } from '../hooks/useApiUrl'
import { Breadcrumbs } from './Breadcrumbs'
import { MessageCard } from './MessageCard'

const stateLength = 2
const zipcodeLength = 5

type AddressFormFields = {
  street?: string
  city?: string
  state?: string
  zipcode?: string
}

type FormFields = {
  addresses: AddressFormFields[]
}

export const AddressForm = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [application, setApplication] = useApplication()
  const [street, setStreet] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [zipcode, setZipcode] = useState<string>('')
  const apiUrl = useApiUrl()

  // When the `existingApplication` is loaded, grab the fields from it
  useLayoutEffect(() => {
    const existingAddress = application?.addresses?.[0]
    setStreet(existingAddress?.street ?? '')
    setCity(existingAddress?.city ?? '')
    setState(existingAddress?.state ?? '')
    setZipcode(existingAddress?.zipcode ?? '')
  }, [application]);

  const streetChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value)
  }

  const cityChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
  }

  const stateChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value.substring(0, stateLength))
  }

  const zipcodeChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setZipcode(e.target.value.substring(0, zipcodeLength))
  }

  const formSubmitted = (e: MouseEvent<HTMLButtonElement>) => {
    if (!application) {
      throw new Error('Application is not defined')
    }
    if (street.length === 0) {
      setMessage('Street must be provided!')
      return
    }
    if (city.length === 0) {
      setMessage('City must be provided!')
      return
    }
    if (state.length !== 2) {
      setMessage('State must be provided!')
      return
    }
    if (zipcode.length !== 5) {
      setMessage('Zipcode must be provided!')
      return
    }
    setMessage('')

    const fields: FormFields = { addresses: [{ street, city, state, zipcode }] }
    const url = `${apiUrl}/applications/${application.id}`
    const body = JSON.stringify(fields)
    fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body
    })
    .then((response) => response.json())
    .then((data) => {
      setApplication(data)
      router.push(`/application/page/3`)
    })
  }

  return (
    <form className="py-6">
      <Breadcrumbs step={2} />
      <MessageCard message={message} />
      <div className="mb-5">
        <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street</label>
        <input type="text" id="street" value={street} placeholder="333 Somewhere Ln." onChange={streetChanged} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <div className="mb-5">
        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
        <input type="text" id="city" value={city} placeholder="Whoville" onChange={cityChanged} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-5">
          <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
          <input type="text" id="state" value={state} placeholder="CA" onChange={stateChanged} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="mb-5">
          <label htmlFor="zipcode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zipcode</label>
          <input type="text" id="zipcode" value={zipcode} placeholder="55555" onChange={zipcodeChanged} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
      </div>
      <button type="button" onClick={formSubmitted} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Continue</button>
    </form>
  )
}