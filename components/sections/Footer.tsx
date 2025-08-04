"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Footer() {
  const quickLinks = [
    { name: "Features", href: "#features" },
    { name: "Testimoniale", href: "#testimoniale" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ]

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main footer content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          {/* Brand */}
          <div className="flex justify-center items-center gap-9">
            <Image src="/ab-logo.png" alt="ActiveBoost" width="60" height="60" className="h-12 w-auto scale-250" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              ActiveBoost
            </span>
          </div>

          <p className="text-slate-300 max-w-md mx-auto">
            Platforma all-in-one pentru antrenori și nutriționiști care vor să își transforme afacerea.
          </p>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-slate-300 hover:text-emerald-400 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </Link>
              )
            })}
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-700 pt-8">
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} ActiveBoost. Toate drepturile rezervate.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
