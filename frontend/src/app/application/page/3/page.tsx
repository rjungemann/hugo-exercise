import { VehiclesForm } from '@/app/components/VehiclesForm'

const Page = () => {
  return (
    <main className="container mx-auto m-6">
      <h1 className="text-4xl pt-24 pb-6">Submit an Application Now</h1>
      <p className="text-xl pb-6">Do you have any vehicles? You can register as few as one or as many as three.</p>
      
      <VehiclesForm />
    </main>
  )
}

export default Page