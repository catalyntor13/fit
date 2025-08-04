"use client"
import { motion } from "framer-motion"
import { Users, Target, BarChart3, Calendar, Shield, Zap } from "lucide-react"

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Gestionare Clienți",
      description:
        "Organizează și gestionează clienții tăi cu ușurință. Păstrează toate informațiile importante într-un singur loc.",
      color: "emerald",
    },
    {
      icon: Target,
      title: "Programe Personalizate",
      description:
        "Creează programe personalizate pentru fiecare client bazate pe obiectivele și nevoile lor specifice.",
      color: "slate",
    },
    {
      icon: BarChart3,
      title: "Analize și Raportări",
      description: "Obține rapoarte detaliate despre progresul clienților și performanța afacerii tale.",
      color: "teal",
    },
    {
      icon: Calendar,
      title: "Programare Inteligentă",
      description: "Gestionează programările și sesiunile cu un sistem de calendar avansat și notificări automate.",
      color: "emerald",
    },
    {
      icon: Shield,
      title: "Securitate Avansată",
      description: "Datele tale și ale clienților sunt protejate cu cele mai înalte standarde de securitate.",
      color: "slate",
    },
    {
      icon: Zap,
      title: "Automatizare Completă",
      description: "Automatizează taskurile repetitive și concentrează-te pe ceea ce contează cu adevărat.",
      color: "teal",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case "emerald":
        return {
          bg: "bg-emerald-100",
          icon: "text-emerald-600",
          border: "border-emerald-200",
        }
      case "teal":
        return {
          bg: "bg-teal-100",
          icon: "text-teal-600",
          border: "border-teal-200",
        }
      default:
        return {
          bg: "bg-slate-100",
          icon: "text-slate-600",
          border: "border-slate-200",
        }
    }
  }

  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-br from-slate-200 via-white to-emerald-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-slate-200/10 rounded-full blur-3xl"></div>
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
            De ce sa alegi
            <span className="block text-green-600">Activeboost</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Descoperă toate funcționalitățile care îți vor transforma modul în care îți gestionezi afacerea
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => {
            const colorClasses = getColorClasses(feature.color)
            const Icon = feature.icon

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className={`group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl border ${colorClasses.border} transition-all duration-300 relative overflow-hidden`}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div
                    className={`${colorClasses.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-8 h-8 ${colorClasses.icon}`} />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Features
