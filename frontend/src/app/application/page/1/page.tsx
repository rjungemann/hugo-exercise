import { BasicsForm } from '@/app/components/BasicsForm'

const Page = () => {
  return (
    <main className="container mx-auto m-6">
      <h1 className="text-4xl pt-24 pb-6">Submit an Application Now</h1>
      <p className="text-xl pb-6">To start, provide your first name, last name and birthdate.</p>
      
      <BasicsForm />
    </main>
  )
}

export default Page