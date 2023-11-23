import { AddressForm } from '@/app/components/AddressForm'

const Page = () => {
  return (
    <main className="container mx-auto m-6">
      <h1 className="text-4xl pt-24 pb-6">Submit an Application Now</h1>
      <p className="text-xl pb-6">To help us cater to your precise needs, what is your current address?</p>
      
      <AddressForm />
    </main>
  )
}

export default Page