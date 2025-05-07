"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Facebook, Instagram, Twitter, ArrowRight, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Image from "next/image"
import { useCart } from "@/context/cart-context"

// Update product prices to Swiss Francs
const products = [
  {
    id: 1,
    name: "Vintage Denim Jacket",
    description: "Classic blue denim jacket with authentic worn details from the 90s",
    price: "Fr. 78",
    image: "/images/product1.png",
    tags: ["90s", "Outerwear", "Denim"],
  },
  {
    id: 2,
    name: "High-Waist Mom Jeans",
    description: "Authentic high-waisted light wash denim jeans with tapered leg",
    price: "Fr. 65",
    image: "/images/product2.png",
    tags: ["90s", "Denim"],
  },
  {
    id: 3,
    name: "Patterned Silk Scarf",
    description: "Vintage silk scarf with colorful geometric pattern from the 1980s",
    price: "Fr. 32",
    image: "/images/product3.png",
    tags: ["80s", "Accessories"],
  },
  {
    id: 4,
    name: "Brown Leather Bag",
    description: "Distressed leather satchel with brass hardware and adjustable strap",
    price: "Fr. 95",
    image: "/images/product4.png",
    tags: ["Accessories", "Rare Finds"],
  },
  {
    id: 5,
    name: "Floral Maxi Dress",
    description: "Flowy bohemian floral print maxi dress with bell sleeves from the 70s",
    price: "Fr. 85",
    image: "/images/product5.png",
    tags: ["70s", "Dresses"],
  },
  {
    id: 6,
    name: "Corduroy Jacket",
    description: "Authentic 1970s brown corduroy jacket with patch pockets",
    price: "Fr. 110",
    image: "/images/product6.png",
    tags: ["70s", "Outerwear", "Rare Finds"],
  },
  {
    id: 7,
    name: "Vintage Band Tee",
    description: "Original 1980s rock band tour t-shirt in well-loved condition",
    price: "Fr. 48",
    image: "/images/product7.png",
    tags: ["80s", "Tops"],
  },
  {
    id: 8,
    name: "Leather Platform Boots",
    description: "Chunky black leather platform boots reminiscent of 90s grunge era",
    price: "Fr. 125",
    image: "/images/product8.png",
    tags: ["90s", "Accessories", "Rare Finds"],
  },
]

// Also update the featured products
const featuredProducts = [
  {
    id: 1,
    name: "Vintage Denim Jacket",
    price: "Fr. 78",
    rating: 4.8,
    reviews: 24,
    image: "/images/product1.png",
  },
  {
    id: 5,
    name: "Floral Maxi Dress",
    price: "Fr. 85",
    rating: 4.9,
    reviews: 18,
    image: "/images/product5.png",
  },
  {
    id: 6,
    name: "Corduroy Jacket",
    price: "Fr. 110",
    rating: 4.7,
    reviews: 15,
    image: "/images/product6.png",
  },
]

// All unique tags for filtering
const allTags = [...new Set(products.flatMap((product) => product.tags))]

export default function HomePage() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<string>("All")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [activeSlide, setActiveSlide] = useState(0)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98])
  const { addItem } = useCart()
  const { toast } = useToast()

  // Auto-rotate featured products
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredProducts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) => product.tags.includes(activeFilter))
      setFilteredProducts(filtered)
    }
  }, [activeFilter])

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation() // Prevent navigation when clicking the add to cart button
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    })
  }

  const navigateToProduct = (productId: number) => {
    router.push(`/product/${productId}`)
  }

  return (
    <div className="bg-[#f8f5f2] min-h-screen">
      <Header />

      {/* Enhanced Hero Section */}
      <section className="relative min-h-[100vh] overflow-hidden bg-[#f8f5f2]">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: "url('/images/pattern.png')" }}></div>
        </div>

        <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <Badge className="bg-[#d35400] text-white px-4 py-1.5 rounded-full text-sm mb-6">
                Sustainable Vintage Fashion
              </Badge>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[#5a3e36] leading-tight mb-6">
                Discover Timeless <span className="text-[#d35400]">Vintage</span> Treasures
              </h1>

              <p className="font-sans text-xl text-[#867762] mb-8 max-w-xl">
                Curated vintage pieces from the 60s to early 2000s. Each item tells a story and gives fashion a second
                life.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-[#d35400] hover:bg-[#e67e22] text-white rounded-full px-8 py-6 text-lg"
                >
                  Shop Collection
                </Button>
                <Button
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-transparent border-2 border-[#d35400] text-[#d35400] hover:bg-[#d35400] hover:text-white rounded-full px-8 py-6 text-lg"
                >
                  Our Story
                </Button>
              </div>

              {/* Featured product quick stats */}
              <div className="mt-12 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-serif font-bold text-[#5a3e36]">500+</p>
                  <p className="text-[#867762]">Unique Items</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-serif font-bold text-[#5a3e36]">5</p>
                  <p className="text-[#867762]">Decades of Style</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-serif font-bold text-[#5a3e36]">100%</p>
                  <p className="text-[#867762]">Sustainable</p>
                </div>
              </div>
            </motion.div>

            {/* Right column - Featured product carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="relative h-[500px] md:h-[600px] w-full">
                {/* Featured product images */}
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeSlide === index ? 1 : 0,
                      scale: activeSlide === index ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.7 }}
                    onClick={() => navigateToProduct(product.id)}
                  >
                    <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />

                      {/* Product info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <h3 className="font-serif text-2xl font-bold text-white mb-1">{product.name}</h3>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="flex text-yellow-400 mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4"
                                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                            <span className="text-white/80 text-sm">
                              {product.rating} ({product.reviews} reviews)
                            </span>
                          </div>
                          <span className="font-bold text-white text-xl">{product.price}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Carousel indicators */}
                <div className="absolute bottom-6 right-6 z-10 flex space-x-2">
                  {featuredProducts.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeSlide === index ? "bg-white scale-125" : "bg-white/50"
                      }`}
                      onClick={() => setActiveSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="text-[#867762] mb-2">Scroll to explore</p>
            <motion.div
              className="w-6 h-10 border-2 border-[#867762] rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              <motion.div className="w-1.5 h-1.5 bg-[#d35400] rounded-full mt-2" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Store Preview Section */}
      <section className="py-24 px-4 md:px-8 lg:px-16" id="shop">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#5a3e36] mb-4">Our Curated Collection</h2>
              <p className="font-sans text-[#867762] max-w-2xl">
                Each piece is hand-selected for quality and character. We believe in giving clothes a second life.
              </p>
            </div>

            <motion.div
              className="mt-6 md:mt-0 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge
                className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-full ${
                  activeFilter === "All" ? "bg-[#d35400] text-white" : "bg-[#e8e1d9] text-[#5a3e36] hover:bg-[#dfd8cf]"
                }`}
                onClick={() => setActiveFilter("All")}
              >
                All
              </Badge>

              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-full ${
                    activeFilter === tag ? "bg-[#d35400] text-white" : "bg-[#e8e1d9] text-[#5a3e36] hover:bg-[#dfd8cf]"
                  }`}
                  onClick={() => setActiveFilter(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                onClick={() => navigateToProduct(product.id)}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl font-medium text-[#5a3e36]">{product.name}</h3>
                    <span className="font-sans font-bold text-[#d35400]">{product.price}</span>
                  </div>

                  <p className="font-sans text-sm text-[#867762] mb-4">{product.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {product.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-[#f0ebe6] text-[#867762] px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-[#e8e1d9] hover:bg-[#d35400] text-[#5a3e36] hover:text-white transition-colors rounded-lg text-sm"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      className="bg-transparent border border-[#d35400] text-[#d35400] hover:bg-[#d35400] hover:text-white rounded-lg text-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigateToProduct(product.id)
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              onClick={() => router.push("/shop")}
              className="bg-transparent border-2 border-[#d35400] text-[#d35400] hover:bg-[#d35400] hover:text-white rounded-full px-8 py-5 text-lg flex items-center"
            >
              Browse All Items
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-[#e8e1d9]" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#5a3e36] mb-6">Our Story</h2>

              <div className="font-sans text-lg text-[#5a3e36] space-y-4">
                <p>
                  RetroBloom was born out of a passion for slow fashion and second chances. Every piece tells a story.
                </p>
                <p>
                  We started as a small pop-up in Brooklyn markets, hunting for treasures in estate sales and thrift
                  stores across the country. Now, our curated collection brings sustainable style to conscious fashion
                  lovers everywhere.
                </p>
                <p>
                  Our team carefully selects each item for quality, uniqueness, and that special something that makes
                  vintage so magical. We clean, repair, and photograph each piece ourselves, ensuring what you see is
                  exactly what you get.
                </p>
              </div>

              <Button className="mt-8 bg-[#d35400] hover:bg-[#e67e22] text-white rounded-full px-8 py-5 text-lg">
                Learn More About Us
              </Button>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ height: "500px" }}
            >
              <Image src="/images/about.png" fill alt="Cozy thrift boutique interior" className="object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-serif text-white text-xl italic">"Fashion fades, style is eternal."</p>
                <p className="text-white/80 mt-2">— Yves Saint Laurent</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact/Newsletter Section */}
      <section className="py-24 px-4 md:px-8 lg:px-16" id="contact">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#5a3e36] mb-4">Join Our Community</h2>
            <p className="font-sans text-[#867762]">
              Sign up for our newsletter to get early access to new arrivals, styling tips, and vintage fashion
              inspiration.
            </p>
          </div>

          <div className="flex max-w-lg mx-auto mb-16">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 py-3 px-4 bg-white border border-[#dfd8cf] rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#d35400]"
            />
            <Button className="bg-[#d35400] hover:bg-[#e67e22] text-white rounded-r-full py-5 px-6">Subscribe</Button>
          </div>

          <div className="flex justify-center items-center">
            <p className="font-serif text-xl text-[#5a3e36] mr-4">Follow us on Instagram</p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                className="bg-[#e8e1d9] text-[#5a3e36] p-3 rounded-full hover:bg-[#d35400] hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Instagram className="h-6 w-6" />
              </motion.a>

              <motion.a
                href="#"
                className="bg-[#e8e1d9] text-[#5a3e36] p-3 rounded-full hover:bg-[#d35400] hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Facebook className="h-6 w-6" />
              </motion.a>

              <motion.a
                href="#"
                className="bg-[#e8e1d9] text-[#5a3e36] p-3 rounded-full hover:bg-[#d35400] hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Twitter className="h-6 w-6" />
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Preview */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="relative aspect-square rounded-xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image src={`/images/instagram${item}.jpg`} fill alt="Instagram post" className="object-cover" />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="text-white h-8 w-8" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 lg:px-16 bg-[#5a3e36] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">RetroBloom</h3>
            <p className="font-sans text-white/80 mb-4">
              Sustainable fashion with a story. <br />
              From the past, for the future.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/80 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-white">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white">
                  70s Collection
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white">
                  90s Revival
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Info</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white">
                  Store Location
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/20 mt-12 pt-8 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} RetroBloom Vintage. All rights reserved.</p>
          <p className="mt-2">Designed with love for sustainable fashion.</p>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}
