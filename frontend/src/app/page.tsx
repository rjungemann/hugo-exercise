import { StartForm } from './components/StartForm'

export default function Home() {
  return (
    <main className="container mx-auto m-6">
      <h1 className="text-4xl pt-24 pb-6">Submit an Application Now</h1>
      <p className="text-xl pb-6">Apply for car insurance in as little as two minutes!</p>
      
      <StartForm />
    </main>
  )
}
