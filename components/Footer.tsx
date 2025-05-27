import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        {/* Header with brand and social links */}
        <div className="flex flex-col sm:flex-row justify-evenly items-center gap-4 mb-6">
          <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
           <Image src='/ab-logo.png' alt="ActiveBoost" width='150' height='200'></Image>
          </span>

          <div className="flex gap-4">
            <Link href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-teal-600 transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
          <Link href="#" className="text-gray-500 hover:text-teal-600">
            Features
          </Link>
          <Link href="#" className="text-gray-500 hover:text-teal-600">
            Pricing
          </Link>
          <Link href="#" className="text-gray-500 hover:text-teal-600">
            Privacy Policy
          </Link>
          <Link href="#" className="text-gray-500 hover:text-teal-600">
            Terms of Service
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} ActiveBoost. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
