import { ReviewForm } from '@/app/components/ReviewForm'

const Page = () => {
  return (
    <main className="container mx-auto m-6">
      <h1 className="text-4xl pt-24 pb-6">Submit an Application Now</h1>
      <p className="text-xl pb-6">Review your application, and send it off when you're ready!</p>
      
      <ReviewForm />
    </main>
  )
}

export default Page