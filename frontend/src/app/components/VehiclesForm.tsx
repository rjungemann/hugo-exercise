'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useApplication } from '../hooks/useApplication'
import { useApiUrl } from '../hooks/useApiUrl'
import { MessageCard } from './MessageCard'
import { Breadcrumbs } from './Breadcrumbs'

const vinLength = 17
const yearLength = 4

type VehicleFormFields = {
  vin?: string;
  year?: string;
  make?: string;
  model?: string;
}

type FormFields = {
  vehicles: VehicleFormFields[]
}

export const VehiclesForm = () => {
  const router = useRouter()
  const [message, setMessage] = useState<string>('')
  const [application, setApplication] = useApplication()
  const [vin, setVin] = useState('')
  const [year, setYear] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [vehicles, setVehicles] = useState<VehicleFormFields[]>([])
  const apiUrl = useApiUrl()

  // When the `existingApplication` is loaded, grab the fields from it
  useEffect(() => {
    const existingVehicles = application?.vehicles ?? []
    setVehicles(existingVehicles)
  }, [application]);

  const vinChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setVin(e.target.value.substring(0, vinLength))
  }

  const yearChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value.substring(0, yearLength))
  }

  const makeChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setMake(e.target.value)
  }

  const modelChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setModel(e.target.value)
  }

  const vehicleAdded = (e: MouseEvent<HTMLButtonElement>) => {
    if (vin.length !== vinLength) {
      setMessage('A VIN must have 17 alphanumeric digits!')
      return
    }
    if (year.length !== yearLength) {
      setMessage('Year must be provided!')
      return
    }
    if (make.length === 0) {
      setMessage('A vehicle make must be provided!')
      return
    }
    if (model.length === 0) {
      setMessage('A vehicle model must be provided!')
      return
    }

    const vehicle = { vin, year, make, model }
    const newVehicles = vehicles.concat([vehicle])
    setVehicles(newVehicles)
    setVin('')
    setYear('')
    setMake('')
    setModel('')
  }

  const vehicleDeletedFn = (index: number) => (e: MouseEvent<HTMLButtonElement>) => {
    setVehicles(vehicles.filter((_, i) => i !== index))
  }

  const formSubmitted = (e: MouseEvent<HTMLButtonElement>) => {
    if (!application) {
      throw new Error('Application is not defined')
    }
    if (vehicles.length < 1 || vehicles.length > 3) {
      setMessage('You must list between one and three vehicles!')
      return
    }
    const fields: FormFields = { vehicles: vehicles }
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
      router.push(`/application/page/4`)
    })
  }

  return (
    <div className="container py-6">
      <Breadcrumbs step={3} />
      <MessageCard message={message} />
      {vehicles.length
        ? (
          <table className="table-auto mb-6 w-full">
            <thead>
              <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">VIN</th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Year</th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Make</th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Model</th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {vehicles.map(({ vin, year, make, model }, i) => {
                return (
                  <tr key={i}>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{vin}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{year}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{make}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{model}</td>
                    {vin?.length && <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      <button type="button" onClick={vehicleDeletedFn(i)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
                    </td>}
                  </tr>
                )
              })}
            </tbody>
          </table>
        )
        : (
          null
        )
      }
      <form className="bg-slate-800 rounded-lg p-6 mb-6">
        <div className="mb-5">
          <label htmlFor="vin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">VIN</label>
          <input type="text" id="vin" value={vin} placeholder="4Y1SL65848Z411439" onChange={vinChanged} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="mb-5">
          <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
          <input type="text" id="year" value={year} placeholder="2022" onChange={yearChanged} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5">
            <label htmlFor="make" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Make</label>
            <input type="text" id="make" value={make} placeholder="Toyota" onChange={makeChanged} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div className="mb-5">
            <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model</label>
            <input type="text" id="model" value={model} placeholder="Corolla" onChange={modelChanged} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
        </div>

        <button type="button" onClick={vehicleAdded} className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Add Vehicle</button>
      </form>

      <button type="button" onClick={formSubmitted} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Continue</button>
    </div>
  )
}