"use client"
import { motion } from "framer-motion"
import { Sparkles, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  const slideInLeft: Variants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  }

  const slideInRight: Variants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  }

  const floatingAnimation = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section id="home" className="relative py-30 flex items-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden">
     

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-slate-500/10 rounded-full border border-emerald-200/50 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 mr-3 text-emerald-600" />
              <span className="text-slate-700 font-medium">Platforma ta de succes</span>
            </motion.div>

            <motion.div {...slideInLeft} className="space-y-6">
              <h1 className=" text-4xl md:text-5xl font-black leading-tight text-slate-900">
                Atrage clienți și
                <span className="block bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  dezvoltă afacerea
                </span>
                <span className="block text-slate-700">cu ActiveBoost</span>
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                O platformă all-in-one pentru antrenori și nutriționiști – atrage clienți, personalizează programe și
                gestionează totul dintr-un singur loc.
              </p>
            </motion.div>

            <motion.div {...slideInLeft} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-4">
              <Link href='/register'>
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Înregistrează-te acum
                <ArrowUpRight className="w-5 h-5 ml-2" />
              </Button>
              </Link>
             
            </motion.div>

        
       
          </div>

          <motion.div {...slideInRight} className="relative">
            <motion.div {...floatingAnimation} className="relative">
           
              {/* Main image container */}
             
   
                <Image
                  src="/photo-page.avif"
                  alt="ActiveBoost Dashboard"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-2xl shadow-xl relative z-10"
                />

            
       
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
