'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useApiUrl } from '../hooks/useApiUrl'
import { useClearSession } from '../hooks/useClearSession'

type FormFields = {
  firstName?: string
  lastName?: string
  birthdate?: string
}

export const StartForm = () => {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthdate, setBirthdate] = useState('') // 2023-11-23
  const apiUrl = useApiUrl()
  const clearSession = useClearSession()

  useEffect(() => {
    clearSession()
  }, [])

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
    const fields: FormFields = {}
    if (firstName.length > 0) {
      fields.firstName = firstName
    }
    if (lastName.length > 0) {
      fields.lastName = lastName
    }
    if (birthdate.length > 0) {
      fields.birthdate = birthdate
    }
    const url = `${apiUrl}/applications`
    const body = JSON.stringify(fields)
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })
    .then((response) => response.text())
    .then((data) => {
      router.push(data)
    })
  }

  return (
    <form className="py-6">
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
      <button type="button" onClick={formSubmitted} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get Started</button>
    </form>
  )
}