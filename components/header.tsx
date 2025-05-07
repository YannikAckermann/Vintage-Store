"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/cart-context"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setIsCartOpen, totalItems } = useCart()

  // Track scroll position to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="z-50">
          <h1
            className={`font-serif text-2xl font-bold ${isScrolled || isMenuOpen ? "text-[#5a3e36]" : "text-[#5a3e36]"}`}
          >
            RetroBloom
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {["Home", "Shop", "About", "Contact"].map((item, index) => (
            <Link
              key={index}
              href={`#${item.toLowerCase()}`}
              className={`font-sans text-sm font-medium border-b-2 border-transparent hover:border-[#d35400] transition-colors ${
                isScrolled ? "text-[#5a3e36]" : "text-[#5a3e36]"
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Shopping Bag */}
        <button
          className={`hidden md:flex items-center font-sans text-sm font-medium ${
            isScrolled ? "text-[#5a3e36]" : "text-[#5a3e36]"
          }`}
          onClick={() => setIsCartOpen(true)}
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5 mr-2" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#d35400] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          Bag ({totalItems})
        </button>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center z-50">
          <button className="mr-4 relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag className={`h-5 w-5 ${isScrolled || isMenuOpen ? "text-[#5a3e36]" : "text-[#5a3e36]"}`} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#d35400] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? "text-[#5a3e36]" : "text-white"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? "text-[#5a3e36]" : "text-[#5a3e36]"}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="fixed inset-0 bg-white flex flex-col justify-center items-center md:hidden"
          initial={{ opacity: 0, x: "100%" }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            x: isMenuOpen ? 0 : "100%",
          }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col items-center space-y-8">
            {["Home", "Shop", "About", "Contact"].map((item, index) => (
              <Link
                key={index}
                href={`#${item.toLowerCase()}`}
                className="font-serif text-2xl font-medium text-[#5a3e36] hover:text-[#d35400] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}

            <button
              className="font-serif text-2xl font-medium text-[#5a3e36] hover:text-[#d35400] transition-colors mt-6 flex items-center"
              onClick={() => {
                setIsMenuOpen(false)
                setIsCartOpen(true)
              }}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Bag ({totalItems})
            </button>
          </nav>
        </motion.div>
      </div>
    </header>
  )
}
