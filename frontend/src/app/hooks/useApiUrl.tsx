export const useApiUrl = (): string => {
  const apiUrl = process.env.API_URL
  if (!apiUrl) {
    throw new Error('API_URL must be provided')
  }
  return apiUrl
}