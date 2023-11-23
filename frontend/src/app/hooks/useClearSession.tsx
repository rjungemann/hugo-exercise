export const useClearSession = () => {
  const clearSession = () => {
    console.info('Clearing session')
    localStorage.removeItem('applicationId')
    sessionStorage.removeItem('application')
  }
  return clearSession
}