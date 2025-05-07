"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ShoppingBag, Heart, X, ChevronRight, ChevronLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Update product prices to Swiss Francs
const products = [
  {
    id: 1,
    name: "Vintage Denim Jacket",
    description: "Classic blue denim jacket with authentic worn details from the 90s",
    price: "Fr. 78",
    image: "/images/product1.png",
    tags: ["90s", "Outerwear", "Denim"],
    details: [
      "Authentic vintage piece from the early 1990s",
      "Medium wash blue denim",
      "Button front closure",
      "Chest flap pockets with button closure",
      "Adjustable button tabs at waist",
      "100% cotton denim",
      "Unisex style, women's size M (fits US 6-8)",
      "Excellent vintage condition with natural character and fade",
    ],
    care: "Machine wash cold with like colors. Tumble dry low. Do not bleach.",
    additionalImages: ["/images/product1.png", "/images/product1.png", "/images/product1.png"],
    relatedProducts: [2, 6, 7],
  },
  {
    id: 2,
    name: "High-Waist Mom Jeans",
    description: "Authentic high-waisted light wash denim jeans with tapered leg",
    price: "Fr. 65",
    image: "/images/product2.png",
    tags: ["90s", "Denim"],
    details: [
      "Authentic vintage piece from the 1990s",
      "Light wash blue denim",
      "High-waisted fit",
      "Tapered leg",
      "Button and zip fly closure",
      "100% cotton denim",
      "Women's size 28 (fits US 6-8)",
      "Excellent vintage condition",
    ],
    care: "Machine wash cold with like colors. Tumble dry low. Do not bleach.",
    additionalImages: ["/images/product2.png", "/images/product2.png", "/images/product2.png"],
    relatedProducts: [1, 3, 5],
  },
  {
    id: 3,
    name: "Patterned Silk Scarf",
    description: "Vintage silk scarf with colorful geometric pattern from the 1980s",
    price: "Fr. 32",
    image: "/images/product3.png",
    tags: ["80s", "Accessories"],
    details: [
      "Authentic vintage piece from the 1980s",
      "100% silk",
      "Vibrant geometric pattern",
      'Square shape, approximately 30" x 30"',
      "Hand-rolled edges",
      "Excellent vintage condition",
    ],
    care: "Dry clean only or hand wash cold with mild detergent. Lay flat to dry. Iron on low heat if needed.",
    additionalImages: ["/images/product3.png", "/images/product3.png", "/images/product3.png"],
    relatedProducts: [4, 8, 2],
  },
  {
    id: 4,
    name: "Brown Leather Bag",
    description: "Distressed leather satchel with brass hardware and adjustable strap",
    price: "Fr. 95",
    image: "/images/product4.png",
    tags: ["Accessories", "Rare Finds"],
    details: [
      "Authentic vintage piece from the 1970s",
      "Genuine distressed leather",
      "Brass hardware",
      "Adjustable shoulder strap",
      "Interior pocket",
      "Magnetic snap closure",
      'Dimensions: 10" H x 12" W x 3" D',
      "Good vintage condition with natural patina and character",
    ],
    care: "Wipe clean with a damp cloth. Condition with leather conditioner as needed.",
    additionalImages: ["/images/product4.png", "/images/product4.png", "/images/product4.png"],
    relatedProducts: [3, 8, 6],
  },
  {
    id: 5,
    name: "Floral Maxi Dress",
    description: "Flowy bohemian floral print maxi dress with bell sleeves from the 70s",
    price: "Fr. 85",
    image: "/images/product5.png",
    tags: ["70s", "Dresses"],
    details: [
      "Authentic vintage piece from the 1970s",
      "Bohemian floral print",
      "V-neckline",
      "Short puff sleeves",
      "Maxi length",
      "Lightweight cotton blend fabric",
      "Women's size S/M (fits US 4-8)",
      "Excellent vintage condition",
    ],
    care: "Hand wash cold. Lay flat to dry. Iron on low heat if needed.",
    additionalImages: ["/images/product5.png", "/images/product5.png", "/images/product5.png"],
    relatedProducts: [6, 3, 7],
  },
  {
    id: 6,
    name: "Corduroy Jacket",
    description: "Authentic 1970s brown corduroy jacket with patch pockets",
    price: "Fr. 110",
    image: "/images/product6.png",
    tags: ["70s", "Outerwear", "Rare Finds"],
    details: [
      "Authentic vintage piece from the 1970s",
      "Brown corduroy fabric",
      "Button front closure",
      "Chest flap pockets",
      "Classic collar",
      "Cotton corduroy outer",
      "Women's size M (fits US 6-8)",
      "Excellent vintage condition",
    ],
    care: "Dry clean only.",
    additionalImages: ["/images/product6.png", "/images/product6.png", "/images/product6.png"],
    relatedProducts: [1, 5, 4],
  },
  {
    id: 7,
    name: "Vintage Band Tee",
    description: "Original 1980s rock band tour t-shirt in well-loved condition",
    price: "Fr. 48",
    image: "/images/product7.png",
    tags: ["80s", "Tops"],
    details: [
      "Authentic vintage piece from the 1980s",
      "Original rock band tour merchandise",
      "Rock & Roll Tour graphic",
      "Black cotton fabric",
      "Crew neck",
      "Short sleeves",
      "Women's size M (fits US 6-8)",
      "Well-loved vintage condition with natural fading and character",
    ],
    care: "Machine wash cold inside out. Tumble dry low. Do not iron directly on graphic.",
    additionalImages: ["/images/product7.png", "/images/product7.png", "/images/product7.png"],
    relatedProducts: [1, 2, 8],
  },
  {
    id: 8,
    name: "Leather Platform Boots",
    description: "Chunky black leather platform boots reminiscent of 90s grunge era",
    price: "Fr. 125",
    image: "/images/product8.png",
    tags: ["90s", "Accessories", "Rare Finds"],
    details: [
      "Authentic vintage piece from the 1990s",
      "Black leather upper",
      "Chunky platform sole",
      "Pull-on style",
      "Ribbed knit top",
      "Rubber sole",
      "Women's size 8 (EU 39)",
      "Excellent vintage condition",
    ],
    care: "Wipe clean with a damp cloth. Condition with leather conditioner as needed.",
    additionalImages: ["/images/product8.png", "/images/product8.png", "/images/product8.png"],
    relatedProducts: [4, 3, 2],
  },
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = Number(params.id)
  const product = products.find((p) => p.id === productId)
  const { addItem } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-[#5a3e36] mb-4">Product not found</h1>
          <Button onClick={() => router.push("/")} className="bg-[#d35400] hover:bg-[#e67e22] text-white">
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const relatedProductsData = product.relatedProducts
    .map((id) => products.find((p) => p.id === id))
    .filter((p) => p !== undefined)

  const handleAddToCart = () => {
    addItem({ ...product, quantity })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    })
  }

  const handleQuantityChange = (value: number) => {
    if (quantity + value > 0) {
      setQuantity(quantity + value)
    }
  }

  const handleImageClick = (index: number) => {
    setActiveImage(index)
    setIsImageModalOpen(true)
  }

  const navigateImage = (direction: "next" | "prev") => {
    const allImages = [product.image, ...(product.additionalImages || [])]
    if (direction === "next") {
      setActiveImage((activeImage + 1) % allImages.length)
    } else {
      setActiveImage((activeImage - 1 + allImages.length) % allImages.length)
    }
  }

  return (
    <div className="bg-[#f8f5f2] min-h-screen">
      <Header />

      <main className="pt-24 pb-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => router.push("/")}
              className="flex items-center text-[#867762] hover:text-[#d35400] transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to all products
            </button>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                onClick={() => handleImageClick(0)}
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {product.additionalImages && product.additionalImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {product.additionalImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                      onClick={() => handleImageClick(index + 1)}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${product.name} - view ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.tags.map((tag) => (
                    <Badge key={tag} className="bg-[#e8e1d9] text-[#5a3e36] hover:bg-[#dfd8cf] px-3 py-1 rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#5a3e36] mb-2">{product.name}</h1>
                <p className="font-sans text-2xl font-bold text-[#d35400] mb-4">{product.price}</p>
                <p className="font-sans text-[#867762] mb-6">{product.description}</p>

                <div className="flex items-center mb-6">
                  <div className="flex text-[#d35400]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5" fill={i < 4 ? "#d35400" : "none"} />
                    ))}
                  </div>
                  <span className="ml-2 text-[#867762] text-sm">4.0 (12 reviews)</span>
                </div>

                <div className="border-t border-b border-[#e8e1d9] py-6 mb-6">
                  <div className="flex items-center mb-6">
                    <span className="font-medium text-[#5a3e36] mr-4">Quantity</span>
                    <div className="flex items-center border border-[#e8e1d9] rounded-full">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="w-10 h-10 flex items-center justify-center text-[#867762] hover:text-[#d35400]"
                      >
                        -
                      </button>
                      <span className="w-10 text-center">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="w-10 h-10 flex items-center justify-center text-[#867762] hover:text-[#d35400]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={handleAddToCart}
                      className="flex-1 bg-[#d35400] hover:bg-[#e67e22] text-white rounded-full py-6"
                    >
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                    <Button className="bg-transparent border-2 border-[#d35400] text-[#d35400] hover:bg-[#d35400] hover:text-white rounded-full w-14 h-14 p-0 flex items-center justify-center">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-medium text-[#5a3e36] mb-3">Product Details</h2>
                    <ul className="list-disc pl-5 text-[#867762] space-y-2">
                      {product.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-serif text-xl font-medium text-[#5a3e36] mb-3">Care Instructions</h2>
                    <p className="text-[#867762]">{product.care}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProductsData.length > 0 && (
            <div className="mt-24">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#5a3e36] mb-8">You May Also Like</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {relatedProductsData.map((relatedProduct) => (
                  <motion.div
                    key={relatedProduct?.id}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -8 }}
                  >
                    <div
                      className="relative h-64 w-full overflow-hidden cursor-pointer"
                      onClick={() => router.push(`/product/${relatedProduct?.id}`)}
                    >
                      <Image
                        src={relatedProduct?.image || ""}
                        alt={relatedProduct?.name || ""}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-xl font-medium text-[#5a3e36]">{relatedProduct?.name}</h3>
                        <span className="font-sans font-bold text-[#d35400]">{relatedProduct?.price}</span>
                      </div>

                      <p className="font-sans text-sm text-[#867762] mb-4">{relatedProduct?.description}</p>

                      <Button
                        onClick={() => router.push(`/product/${relatedProduct?.id}`)}
                        className="w-full bg-[#e8e1d9] hover:bg-[#d35400] text-[#5a3e36] hover:text-white transition-colors rounded-lg text-sm"
                      >
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsImageModalOpen(false)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-[#d35400] transition-colors"
              onClick={() => setIsImageModalOpen(false)}
            >
              <X className="h-8 w-8" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#d35400] transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                navigateImage("prev")
              }}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#d35400] transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                navigateImage("next")
              }}
            >
              <ChevronRight className="h-10 w-10" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={
                  activeImage === 0
                    ? product.image
                    : product.additionalImages
                      ? product.additionalImages[activeImage - 1]
                      : product.image
                }
                alt={product.name}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster />
    </div>
  )
}
