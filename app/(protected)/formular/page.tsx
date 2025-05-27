import { getUser } from '@/lib/auth'
import FormularLinkGenerator from '@/app/(protected)/formular/formular-link'

export default async function FormularPage() {
  // Get the cached user - this will use the cached result from the layout
  const user = await getUser()
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Genereaza linkul personalizat</h1>
      <p className="mb-4">
       Generați un link unic către sondaj pe care îl puteți partaja cu clienții dvs.
      </p>
      {/* Pass the user ID to the client component */}
      <FormularLinkGenerator userId={user.id} />
    </div>
  )
}