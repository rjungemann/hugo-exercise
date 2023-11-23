import { useSearchParams } from "next/navigation"
import { useApplication } from "../hooks/useApplication"
import Link from "next/link"

export const Breadcrumbs = ({ step }: { step: number }) => {
  const searchParams = useSearchParams()
  const applicationPayload = searchParams.get('application')
  const [application, _] = useApplication()
  const linkClassNames = 'text-blue-700 hover:text-blue-800 font-medium dark:text-blue-600 dark:hover:text-blue-700'
  return (
    <div className="container mb-12 p2">
      {step >= 1 ? <Link href={`/application/page/1?application=${applicationPayload || JSON.stringify(application)}`} className={linkClassNames}>Step #1: Basic Info</Link> : <span>Step #1: Basic Info</span>}
      <span className="mx-3">/</span>
      {step >= 2 ? <Link href="/application/page/2" className={linkClassNames}>Step #2: Address</Link> : <span>Step #1: Address</span>}
      <span className="mx-3">/</span>
      {step >= 3 ? <Link href="/application/page/3" className={linkClassNames}>Step #3: Vehicles</Link> : <span>Step #3: Vehicles</span>}
      <span className="mx-3">/</span>
      {step >= 4 ? <Link href="/application/page/3" className={linkClassNames}>Step #4: Review</Link> : <span>Step #4: Review</span>}
    </div>
  )
}