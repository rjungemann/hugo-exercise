import { useEffect, useState } from 'react'
import { Application } from '../types/Application'
import { useApiUrl } from './useApiUrl'

export const useApplication = (): [Application | null, (application: Application | null) => void] => {
  const apiUrl = useApiUrl()
  const [applicationId, setApplicationId] = useState<number | null>(null)
  useEffect(() => {
    const existingApplicationId = JSON.parse(localStorage.getItem('applicationId') || 'null')
    setApplicationId(existingApplicationId);
  }, [])
  const [application, setApplication] = useState<Application | null>(null)
  useEffect(() => {
    const existingApplication = JSON.parse(localStorage.getItem('application') || 'null')
    if (existingApplication) {
      setApplication(existingApplication)
    }
  }, [])
  useEffect(() => {
    if (!applicationId) {
      return
    }

    const url = `${apiUrl}/applications/${applicationId}`
    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => response.json())
    .then((data) => {
      callback(data)
    })
  }, [applicationId])
  const callback = (application: Application | null) => {
    localStorage.setItem('application', JSON.stringify(application))
    setApplication(application)
  }

  return [application, callback]
}