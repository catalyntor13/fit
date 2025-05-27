import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"



export function Navigation() {
    return (
        <header className="bg-gray-200s text-white backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-48">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
            
              <span className="text-xl font-bold bg-clip-text text-white">
               <Image src='/ab-logo.png' alt="ActiveBoost" width='150' height='200'></Image>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="default" className="text-white cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-green-600  text-white cursor-pointer">Incepe</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    )
}