"use client"
import { useState } from "react"
import scrollToId from "@/lib/scrollToId"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const Header = () => {
  const [open, setOpen] = useState(false)

  const navItems = [
    { name: "Features", href: "features" },
    { name: "Testimoniale", href: "testimoniale" },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} >
          <button
            onClick={() => scrollToId("home", 80, 1200)}
            className="cursor-pointer transition-transform scale-255 pl-5"
          >
            <Image src="/ab-logo.png" alt="ActiveBoost" width="100" height="100" className="h-12 w-auto" />
          </button>
        </motion.div>

        {/* PC Navigation */}
        <nav className="hidden md:flex gap-8 items-center ">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <button
                onClick={() => scrollToId(item.href, 80, 1200)}
                className="relative cursor-pointer text-slate-700 hover:text-emerald-600 transition-colors duration-300 font-medium group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/login">
              <Button
                variant="outline"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
              >
                Loghează-te
              </Button>
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-slate-700">
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-gradient-to-br from-slate-50 to-emerald-50 border-none w-[280px]">
            <div className="flex flex-col gap-8 py-8 px-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    scrollToId(item.href, 80, 1200)
                    setOpen(false)
                  }}
                  className="text-lg font-semibold text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer text-left p-2 rounded-lg hover:bg-white/50"
                >
                  {item.name}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold py-3 rounded-lg transition-all duration-300"
                    onClick={() => setOpen(false)}
                  >
                    Loghează-te
                  </Button>
                </Link>
              </motion.div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}

export default Header
