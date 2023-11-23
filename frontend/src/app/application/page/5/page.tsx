const Page = () => {
  const premium = (Math.random() * 250.0 + 100.0).toFixed(2)
  return (
    <main className="container mx-auto m-6">
      <h1 className="text-4xl pt-24 pb-6">Application Submitted</h1>
      <p className="text-xl pb-6 mb-6">Estimated premium is $<strong>{premium}</strong> a month!</p>
      <a href="/" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Start Over</a>
    </main>
  )
}

export default Page