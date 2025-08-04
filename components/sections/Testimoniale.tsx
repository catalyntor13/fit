"use client"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const Testimoniale = () => {
  const Recenzii = [
    {
      name: "Andrei",
      testimonial:
        "ActiveBoost mi-a transformat afacerea! Clienții mei sunt mai mulțumiți ca niciodată și am reușit să îmi dublez veniturile în doar 6 luni.",
      role: "Antrenor Personal",
      rating: 5,
      image: "/avatars/avatar1.jpg",
    },
    {
      name: "Maria",
      testimonial:
        "Platforma este intuitivă și eficientă. Recomand cu căldură ActiveBoost tuturor colegilor din domeniu!",
      role: "Nutriționist",
      rating: 5,
      image: "/avatars/avatar2.jpg",
    },
    {
      name: "Ion",
      testimonial:
        "Un instrument esențial pentru orice profesionist în domeniul fitnessului! Nu mai pot lucra fără el.",
      role: "Antrenor de Fitness",
      rating: 5,
      image: "/avatars/avatar3.jpg",
    },
    {
      name: "Elena",
      testimonial:
        "ActiveBoost m-a ajutat să îmi cresc numărul de clienți cu 200% și să îmi organizez mult mai bine programul.",
      role: "Antrenor Personal",
      rating: 5,
      image: "/avatars/avatar4.jpg",
    },
    {
      name: "Cristian",
      testimonial:
        "Sunt foarte mulțumit de funcționalitățile platformei. E tot ce aveam nevoie pentru a-mi digitaliza afacerea!",
      role: "Nutriționist",
      rating: 5,
      image: "/avatars/avatar5.jpg",
    },
    {
      name: "Ana",
      testimonial:
        "ActiveBoost este soluția perfectă pentru a gestiona clienții și programele personalizate. Economisesc 10 ore pe săptămână!",
      role: "Antrenor de Fitness",
      rating: 5,
      image: "/avatars/avatar6.jpg",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section
      id="testimoniale"
      className="py-24 bg-gradient-to-br from-emerald-50 via-white to-slate-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-slate-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
             Testimoniale
            <span className="block text-emerald-600 mt-5">Ce spun clientii nostri</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Peste 500 de antrenori și nutriționiști și-au transformat afacerea cu ActiveBoost
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
        >
          {Recenzii.map((recenzie, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 transition-all duration-300 relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                {/* Quote icon */}
                <div className="absolute -top-2 -right-2 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Quote className="w-16 h-16 text-emerald-600" />
                </div>

                {/* Rating stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(recenzie.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-slate-700 mb-6 leading-relaxed text-lg italic">&quot;{recenzie.testimonial}&quot;</p>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14 ring-2 ring-emerald-100 group-hover:ring-emerald-200 transition-all duration-300">
                    <AvatarImage src={recenzie.image || "/placeholder.svg"} alt={recenzie.name} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-600 font-semibold text-lg">
                      {recenzie.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300">
                      {recenzie.name}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">{recenzie.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-slate-600 mb-4">Alătură-te comunității de profesioniști mulțumiți</p>
          <div className="flex justify-center items-center gap-2 text-sm text-slate-500">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 bg-emerald-100 rounded-full border-2 border-white"></div>
              ))}
            </div>
            <span>+500 antrenori activi</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimoniale
