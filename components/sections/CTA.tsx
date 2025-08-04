"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const CTA = () => {
  return (
    <section id="calltoaction" className="py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-300 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-white space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full backdrop-blur-sm border border-white/30"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            <span className="font-medium">Începe astăzi</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
           Atrage Clienti cu
            <span className="block text-teal-200">ActiveBoost</span>
          </h2>

          <p className="text-xl text-emerald-100 leading-relaxed max-w-2xl mx-auto">
            Alătură-te celor peste 500 de profesioniști care și-au dublat veniturile cu platforma noastră.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Înregistrează-te gratuit
                <ArrowUpRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

         
          </motion.div>

         
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
