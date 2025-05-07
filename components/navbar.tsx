"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, Phone, Users, Mail, Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { label: "Startseite", icon: <Home className="h-4 w-4 mr-2" />, href: "/" },
    { label: "Themen", icon: <BookOpen className="h-4 w-4 mr-2" />, href: "/themen" },
    { label: "Soforthilfe", icon: <Phone className="h-4 w-4 mr-2" />, href: "/soforthilfe" },
    { label: "Über uns", icon: <Users className="h-4 w-4 mr-2" />, href: "/ueber-uns" },
    { label: "Kontakt", icon: <Mail className="h-4 w-4 mr-2" />, href: "/kontakt" },
  ]

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-green-700 font-bold text-xl">Besser.atmen</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors duration-200 flex items-center"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            <Button className="ml-4 bg-green-600 hover:bg-green-700">
              <Phone className="h-4 w-4 mr-2" />
              Hilfe holen
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-xl">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors duration-200 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
              <Phone className="h-4 w-4 mr-2" />
              Hilfe holen
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
