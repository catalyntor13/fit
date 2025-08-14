import { getUser } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


export default async function FormularPage() {
  // Get the cached user - this will use the cached result from the layout
  const user = await getUser()
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6"> Creeaza-ti propriul formular </h1>
      
      {/* Pass the user ID to the client component */}

      <Link href='/formular/customize'>
      <Button>Adauga</Button>
      </Link>
    </div>
  )
}