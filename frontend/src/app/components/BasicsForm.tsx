'use client'

import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useApiUrl } from '../hooks/useApiUrl'
import { Breadcrumbs } from './Breadcrumbs'
import { MessageCard } from './MessageCard'
import { useApplication } from '../hooks/useApplication'

const birthdateRegexp = /\d{4}-\d{2}-\d{2}/

type FormFields = {
  firstName?: string
  lastName?: string
  birthdate?: string
}

export const BasicsForm = () => {
  const searchParams = useSearchParams()
  const applicationPayload = searchParams.get('application')
  if (!applicationPayload) {
    throw new Error('could not retrieve application query parameter')
  }

  const [application, setApplication] = useApplication()

  useEffect(() => {
    const application = JSON.parse(applicationPayload)
    const id = application.id
    if (!id) {
      throw new Error('ID must be provided')
    }

    setApplication(application)
  }, [applicationPayload])

  useEffect(() => {
    const existingFirstName = application?.firstName
    if (existingFirstName) {
      setFirstName(existingFirstName)
    }
    const existingLastName = application?.lastName
    if (existingLastName) {
      setLastName(existingLastName)
    }
    const existingBirthdate = application?.birthdate
    if (existingBirthdate) {
      setBirthdate(existingBirthdate.split('T')[0])
    }
  }, [application])

  const router = useRouter()
  const [message, setMessage] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const apiUrl = useApiUrl()

  const firstNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
  }

  const lastNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
  }

  const birthdateChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setBirthdate(e.target.value)
  }

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
    if (!birthdate.match(birthdateRegexp)) {
      setMessage('Birthdate must be provided!')
      return
    }
    setMessage('')
    
    const fields: FormFields = { firstName, lastName, birthdate }
    const url = `${apiUrl}/applications/${application.id}`
    const body = JSON.stringify(fields)
    fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body
    })
    .then((response) => response.text())
    .then((data) => {
      router.push(`/application/page/2`)
    })
  }

  return (
    <form className="py-6">
      <Breadcrumbs step={1} />
      <MessageCard message={message} />
      <div className="mb-5">
        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
        <input type="text" id="firstName" value={firstName} onChange={firstNameChanged} placeholder="Jane" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <div className="mb-5">
        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
        <input type="text" id="lastName" value={lastName} onChange={lastNameChanged} placeholder="Doe" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <div className="mb-5">
        <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthdate</label>
        <input type="date" id="birthdate" value={birthdate} onChange={birthdateChanged} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <button type="button" onClick={formSubmitted} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Continue</button>
    </form>
  )
}
