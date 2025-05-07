"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, ShoppingBag, CreditCard, Check, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { TwintIcon, PostFinanceIcon, GenericCardIcon } from "@/components/payment-icons"

type CheckoutStep = "cart" | "information" | "shipping" | "payment" | "confirmation"

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, subtotal, totalItems, clearCart } = useCart()
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("cart")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    canton: "",
  })
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [showCantonDropdown, setShowCantonDropdown] = useState(false)

  // Swiss cantons
  const cantons = [
    "Zürich (ZH)",
    "Bern (BE)",
    "Luzern (LU)",
    "Uri (UR)",
    "Schwyz (SZ)",
    "Obwalden (OW)",
    "Nidwalden (NW)",
    "Glarus (GL)",
    "Zug (ZG)",
    "Freiburg (FR)",
    "Solothurn (SO)",
    "Basel-Stadt (BS)",
    "Basel-Landschaft (BL)",
    "Schaffhausen (SH)",
    "Appenzell Ausserrhoden (AR)",
    "Appenzell Innerrhoden (AI)",
    "St. Gallen (SG)",
    "Graubünden (GR)",
    "Aargau (AG)",
    "Thurgau (TG)",
    "Tessin (TI)",
    "Waadt (VD)",
    "Wallis (VS)",
    "Neuenburg (NE)",
    "Genf (GE)",
    "Jura (JU)",
  ]

  // Shipping costs
  const shippingCosts = {
    standard: 7.9,
    express: 12.9,
    priority: 18.9,
  }

  // Calculate total with shipping
  const calculateTotal = () => {
    const subtotalValue = Number.parseFloat(subtotal.replace("Fr.", "").trim())
    const shippingCost = shippingCosts[shippingMethod as keyof typeof shippingCosts]
    return (subtotalValue + shippingCost).toFixed(2)
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (checkoutStep === "cart") {
      setCheckoutStep("information")
    } else if (checkoutStep === "information") {
      setCheckoutStep("shipping")
    } else if (checkoutStep === "shipping") {
      setCheckoutStep("payment")
    } else if (checkoutStep === "payment") {
      // Process payment
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setCheckoutStep("confirmation")
        clearCart()
      }, 2000)
    }
  }

  // Go back to previous step
  const goBack = () => {
    if (checkoutStep === "information") {
      setCheckoutStep("cart")
    } else if (checkoutStep === "shipping") {
      setCheckoutStep("information")
    } else if (checkoutStep === "payment") {
      setCheckoutStep("shipping")
    }
  }

  // Close cart when pressing escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCartOpen(false)
      }
    }

    window.addEventListener("keydown", handleEsc)

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [setIsCartOpen])

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isCartOpen])

  // Reset checkout step when cart is closed
  useEffect(() => {
    if (!isCartOpen) {
      setTimeout(() => {
        setCheckoutStep("cart")
      }, 300)
    }
  }, [isCartOpen])

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsCartOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-xl flex flex-col"
          >
            {/* Cart Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-serif text-xl font-bold text-[#5a3e36] flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                {checkoutStep === "cart" && `Warenkorb ${totalItems > 0 ? `(${totalItems})` : ""}`}
                {checkoutStep === "information" && "Kontaktinformationen"}
                {checkoutStep === "shipping" && "Versandmethode"}
                {checkoutStep === "payment" && "Zahlungsmethode"}
                {checkoutStep === "confirmation" && "Bestellung bestätigt"}
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-[#d35400] transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Checkout Progress */}
            {checkoutStep !== "cart" && checkoutStep !== "confirmation" && (
              <div className="px-4 py-2 bg-[#f8f5f2]">
                <div className="flex justify-between items-center">
                  {["information", "shipping", "payment"].map((step, index) => (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 text-xs ${
                          step === checkoutStep
                            ? "bg-[#d35400] text-white"
                            : checkoutStep === "payment" && (step === "information" || step === "shipping")
                              ? "bg-green-500 text-white"
                              : checkoutStep === "shipping" && step === "information"
                                ? "bg-green-500 text-white"
                                : "bg-[#e8e1d9] text-[#867762]"
                        }`}
                      >
                        {checkoutStep === "payment" && (step === "information" || step === "shipping") ? (
                          <Check className="h-3 w-3" />
                        ) : checkoutStep === "shipping" && step === "information" ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          index + 1
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative h-1 bg-[#e8e1d9] mt-1 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-[#d35400]"
                    initial={{ width: "0%" }}
                    animate={{
                      width:
                        checkoutStep === "information"
                          ? "33.33%"
                          : checkoutStep === "shipping"
                            ? "66.66%"
                            : checkoutStep === "payment"
                              ? "100%"
                              : "0%",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Cart Items View */}
              {checkoutStep === "cart" && (
                <div className="p-4">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                      <div className="bg-[#f8f5f2] p-6 rounded-full mb-4">
                        <ShoppingBag className="h-10 w-10 text-[#867762]" />
                      </div>
                      <h3 className="font-serif text-lg font-medium text-[#5a3e36] mb-2">Dein Warenkorb ist leer</h3>
                      <p className="text-[#867762] mb-6">
                        Du hast noch keine Vintage-Schätze in deinen Warenkorb gelegt.
                      </p>
                      <Button
                        className="bg-[#d35400] hover:bg-[#e67e22] text-white rounded-full px-6"
                        onClick={() => setIsCartOpen(false)}
                      >
                        Weiter einkaufen
                      </Button>
                    </div>
                  ) : (
                    <>
                      <ul className="space-y-4 mb-4">
                        {items.map((item) => (
                          <motion.li
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex border border-gray-100 rounded-xl overflow-hidden shadow-sm"
                          >
                            {/* Product Image */}
                            <div className="w-24 h-24 relative flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 p-3 flex flex-col">
                              <div className="flex justify-between">
                                <h4 className="font-serif text-sm font-medium text-[#5a3e36]">{item.name}</h4>
                                <span className="font-sans font-bold text-[#d35400]">{item.price}</span>
                              </div>

                              <p className="text-xs text-[#867762] line-clamp-1 mb-2">{item.description}</p>

                              {/* Quantity Controls */}
                              <div className="flex justify-between items-center mt-auto">
                                <div className="flex items-center border border-gray-200 rounded-full">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center text-[#867762] hover:text-[#d35400]"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center text-[#867762] hover:text-[#d35400]"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-xs text-[#867762] hover:text-[#d35400] underline"
                                >
                                  Entfernen
                                </button>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </ul>

                      <div className="border-t border-gray-200 pt-4 space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#867762]">Zwischensumme</span>
                          <span className="font-medium text-[#5a3e36]">{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#867762]">Versand</span>
                          <span className="text-[#867762]">Wird im nächsten Schritt berechnet</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span className="text-[#5a3e36]">Geschätzte Gesamtsumme</span>
                          <span className="text-[#5a3e36]">{subtotal}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Information Step */}
              {checkoutStep === "information" && (
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-[#5a3e36] mb-1">
                        Vorname
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-[#5a3e36] mb-1">
                        Nachname
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#5a3e36] mb-1">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#5a3e36] mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-[#5a3e36] mb-1">
                      Adresse
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-[#5a3e36] mb-1">
                        Ort
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-[#5a3e36] mb-1">
                        PLZ
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="canton" className="block text-sm font-medium text-[#5a3e36] mb-1">
                      Kanton
                    </label>
                    <div
                      className="w-full p-2 border border-[#e8e1d9] rounded-lg flex justify-between items-center cursor-pointer"
                      onClick={() => setShowCantonDropdown(!showCantonDropdown)}
                    >
                      <span>{formData.canton || "Kanton auswählen"}</span>
                      {showCantonDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    {showCantonDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-[#e8e1d9] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {cantons.map((canton) => (
                          <div
                            key={canton}
                            className="p-2 hover:bg-[#f8f5f2] cursor-pointer"
                            onClick={() => {
                              setFormData({ ...formData, canton })
                              setShowCantonDropdown(false)
                            }}
                          >
                            {canton}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </form>
              )}

              {/* Shipping Step */}
              {checkoutStep === "shipping" && (
                <div className="p-4 space-y-4">
                  <h3 className="font-serif text-lg font-medium text-[#5a3e36] mb-2">Versandmethode wählen</h3>

                  <div className="space-y-3">
                    <div
                      className={`border rounded-lg p-3 cursor-pointer ${
                        shippingMethod === "standard"
                          ? "border-[#d35400] bg-[#fff8f3]"
                          : "border-[#e8e1d9] hover:border-gray-300"
                      }`}
                      onClick={() => setShippingMethod("standard")}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="standard"
                          name="shipping"
                          checked={shippingMethod === "standard"}
                          onChange={() => setShippingMethod("standard")}
                          className="mr-3"
                        />
                        <label htmlFor="standard" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-[#5a3e36]">Standard Versand</span>
                            <span className="font-medium text-[#5a3e36]">Fr. 7.90</span>
                          </div>
                          <p className="text-sm text-[#867762] mt-1">Lieferung in 2-4 Werktagen</p>
                        </label>
                      </div>
                    </div>

                    <div
                      className={`border rounded-lg p-3 cursor-pointer ${
                        shippingMethod === "express"
                          ? "border-[#d35400] bg-[#fff8f3]"
                          : "border-[#e8e1d9] hover:border-gray-300"
                      }`}
                      onClick={() => setShippingMethod("express")}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="express"
                          name="shipping"
                          checked={shippingMethod === "express"}
                          onChange={() => setShippingMethod("express")}
                          className="mr-3"
                        />
                        <label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-[#5a3e36]">Express Versand</span>
                            <span className="font-medium text-[#5a3e36]">Fr. 12.90</span>
                          </div>
                          <p className="text-sm text-[#867762] mt-1">Lieferung in 1-2 Werktagen</p>
                        </label>
                      </div>
                    </div>

                    <div
                      className={`border rounded-lg p-3 cursor-pointer ${
                        shippingMethod === "priority"
                          ? "border-[#d35400] bg-[#fff8f3]"
                          : "border-[#e8e1d9] hover:border-gray-300"
                      }`}
                      onClick={() => setShippingMethod("priority")}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="priority"
                          name="shipping"
                          checked={shippingMethod === "priority"}
                          onChange={() => setShippingMethod("priority")}
                          className="mr-3"
                        />
                        <label htmlFor="priority" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-[#5a3e36]">Priority Versand</span>
                            <span className="font-medium text-[#5a3e36]">Fr. 18.90</span>
                          </div>
                          <p className="text-sm text-[#867762] mt-1">Lieferung am nächsten Werktag</p>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#867762]">Zwischensumme</span>
                      <span className="font-medium text-[#5a3e36]">{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#867762]">Versand</span>
                      <span className="font-medium text-[#5a3e36]">
                        Fr. {shippingCosts[shippingMethod as keyof typeof shippingCosts].toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium text-lg mt-4">
                      <span className="text-[#5a3e36]">Gesamtsumme</span>
                      <span className="text-[#d35400]">Fr. {calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {checkoutStep === "payment" && (
                <div className="p-4 space-y-4">
                  <h3 className="font-serif text-lg font-medium text-[#5a3e36] mb-2">Zahlungsmethode wählen</h3>

                  <div className="space-y-3">
                    <div
                      className={`border rounded-lg p-3 cursor-pointer ${
                        paymentMethod === "twint"
                          ? "border-[#d35400] bg-[#fff8f3]"
                          : "border-[#e8e1d9] hover:border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod("twint")}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="twint"
                          name="payment"
                          checked={paymentMethod === "twint"}
                          onChange={() => setPaymentMethod("twint")}
                          className="mr-3"
                        />
                        <label htmlFor="twint" className="flex-1 cursor-pointer flex items-center justify-between">
                          <span className="font-medium text-[#5a3e36]">TWINT</span>
                          <TwintIcon />
                        </label>
                      </div>
                    </div>

                    <div
                      className={`border rounded-lg p-3 cursor-pointer ${
                        paymentMethod === "postfinance"
                          ? "border-[#d35400] bg-[#fff8f3]"
                          : "border-[#e8e1d9] hover:border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod("postfinance")}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="postfinance"
                          name="payment"
                          checked={paymentMethod === "postfinance"}
                          onChange={() => setPaymentMethod("postfinance")}
                          className="mr-3"
                        />
                        <label
                          htmlFor="postfinance"
                          className="flex-1 cursor-pointer flex items-center justify-between"
                        >
                          <span className="font-medium text-[#5a3e36]">PostFinance</span>
                          <PostFinanceIcon />
                        </label>
                      </div>
                    </div>

                    <div
                      className={`border rounded-lg p-3 cursor-pointer ${
                        paymentMethod === "card"
                          ? "border-[#d35400] bg-[#fff8f3]"
                          : "border-[#e8e1d9] hover:border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="card"
                          name="payment"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="mr-3"
                        />
                        <label htmlFor="card" className="flex-1 cursor-pointer flex items-center justify-between">
                          <span className="font-medium text-[#5a3e36]">Kreditkarte</span>
                          <GenericCardIcon />
                        </label>
                      </div>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="mt-4 space-y-3 p-3 border border-[#e8e1d9] rounded-lg">
                        <div>
                          <label htmlFor="cardName" className="block text-sm font-medium text-[#5a3e36] mb-1">
                            Name auf der Karte
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            className="w-full p-2 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                            placeholder="Max Mustermann"
                          />
                        </div>

                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-[#5a3e36] mb-1">
                            Kartennummer
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="cardNumber"
                              className="w-full p-2 pl-9 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                              placeholder="1234 5678 9012 3456"
                            />
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#867762]" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiry" className="block text-sm font-medium text-[#5a3e36] mb-1">
                              Ablaufdatum
                            </label>
                            <input
                              type="text"
                              id="expiry"
                              className="w-full p-2 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                              placeholder="MM/JJ"
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-[#5a3e36] mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              className="w-full p-2 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#867762]">Zwischensumme</span>
                      <span className="font-medium text-[#5a3e36]">{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#867762]">Versand</span>
                      <span className="font-medium text-[#5a3e36]">
                        Fr. {shippingCosts[shippingMethod as keyof typeof shippingCosts].toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium text-lg mt-4">
                      <span className="text-[#5a3e36]">Gesamtsumme</span>
                      <span className="text-[#d35400]">Fr. {calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirmation Step */}
              {checkoutStep === "confirmation" && (
                <div className="p-4 text-center">
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#5a3e36] mb-4">
                    Vielen Dank für deine Bestellung!
                  </h3>
                  <p className="text-[#867762] mb-6">
                    Deine Bestellung wurde erfolgreich aufgegeben. Wir haben dir eine Bestätigungs-E-Mail gesendet.
                  </p>

                  <div className="bg-[#f8f5f2] rounded-xl p-4 mb-6">
                    <h4 className="font-serif text-lg font-medium text-[#5a3e36] mb-2">Bestellnummer: #RT78291</h4>
                    <p className="text-sm text-[#867762]">7. Mai 2025</p>
                  </div>

                  <Button
                    className="bg-[#d35400] hover:bg-[#e67e22] text-white rounded-full px-6"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Weiter einkaufen
                  </Button>
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {checkoutStep !== "confirmation" && (
              <div className="border-t border-gray-200 p-4 bg-[#f8f5f2]">
                {checkoutStep === "cart" ? (
                  items.length > 0 && (
                    <Button
                      onClick={handleSubmit}
                      className="w-full bg-[#d35400] hover:bg-[#e67e22] text-white rounded-full py-5 font-medium"
                    >
                      Zur Kasse
                    </Button>
                  )
                ) : (
                  <div className="flex gap-3">
                    <Button
                      onClick={goBack}
                      className="flex-1 bg-transparent border border-[#d35400] text-[#d35400] hover:bg-[#d35400] hover:text-white rounded-full py-5"
                    >
                      Zurück
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={
                        (checkoutStep === "payment" && !paymentMethod) ||
                        (checkoutStep === "payment" && paymentMethod === "card" && isProcessing)
                      }
                      className="flex-1 bg-[#d35400] hover:bg-[#e67e22] text-white rounded-full py-5 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Verarbeitung...
                        </span>
                      ) : checkoutStep === "information" ? (
                        "Weiter zu Versand"
                      ) : checkoutStep === "shipping" ? (
                        "Weiter zu Zahlung"
                      ) : (
                        "Bestellung abschliessen"
                      )}
                    </Button>
                  </div>
                )}

                {checkoutStep === "cart" && items.length > 0 && (
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full text-center text-[#5a3e36] hover:text-[#d35400] text-sm mt-4"
                  >
                    Weiter einkaufen
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
