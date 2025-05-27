import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart, Users, Calendar } from "lucide-react"
import Link from "next/link"



export default function Home() {
  return (

      /* Main Div */
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      
       <Navigation/>

       {/* Hero Section */}
      <main>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <div className="inline-block">
                  <span className="bg-teal-50 text-teal-600 px-4 py-1.5 rounded-full text-sm font-medium">
                    Platforma Fitness 
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  Gestionează clienți, <br />
                  și dezvoltă-ți afacerea <br />
                  cu{" "}
                  <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                    ActiveBoost
                  </span>
                </h1>

                <p className="text-gray-600 text-lg md:text-xl max-w-xl">
                 O platformă all-in-one pentru antrenori și nutriționiști – atrage clienți, personalizează programe și gestionează totul dintr-un singur loc.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href='/register'>
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer">
                    Incepe acum<ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  </Link>
              
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 opacity-30 blur"></div>
                  <img
                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1740&auto=format&fit=crop"
                    alt="ActiveFit Dashboard Preview"
                    className="relative rounded-xl border border-gray-200 shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tot ce ai nevoie pentru a reusii</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Activeboost ofera toate tool-urile necesare pentru a-ti gestiona clientii
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                  <BarChart className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Client Analytics</h3>
                <p className="text-gray-600">
                  Urmărește progresul clienților cu analize și vizualizări detaliate pentru a le optimiza parcursul în fitness.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Client Management</h3>
                <p className="text-gray-600">
                  Easily manage all your clients, their profiles, and fitness plans in one centralized platform.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Scheduling</h3>
                <p className="text-gray-600">
                  Schedule sessions, set reminders, and manage your calendar to maximize your coaching efficiency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Fitness Professionals</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                See what fitness coaches and trainers are saying about ActiveFit.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-gray-500 text-sm">Personal Trainer</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "ActiveFit has transformed how I manage my fitness business. The client tracking features and
                  analytics have helped me provide better service and grow my client base."
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Michael Rodriguez</h4>
                    <p className="text-gray-500 text-sm">Fitness Coach</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The survey forms and client onboarding process in ActiveFit have saved me hours of administrative
                  work. I can now focus more on what I love - helping clients achieve their fitness goals."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Fitness Business?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of fitness professionals who are growing their business with ActiveFit.
            </p>
            <Link href='/register'>
            <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 cursor-pointer">
              Incepe Acum
            </Button>
            </Link>
          </div>
        </section>
      </main>

       <Footer/>
    </div>
/* Main Div */
     
  );
}
