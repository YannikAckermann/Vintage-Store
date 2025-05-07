"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, CreditCard, Truck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

type CheckoutStep = "information" | "shipping" | "payment" | "confirmation"

export default function CheckoutForm() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("information")
  const [isProcessing, setIsProcessing] = useState(false)
  const { items, subtotal, clearCart } = useCart()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep === "information") {
      setCurrentStep("shipping")
    } else if (currentStep === "shipping") {
      setCurrentStep("payment")
    } else if (currentStep === "payment") {
      // Simulate payment processing
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setCurrentStep("confirmation")
        clearCart()
      }, 2000)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {["information", "shipping", "payment", "confirmation"].map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  step === currentStep
                    ? "bg-[#d35400] text-white"
                    : step === "confirmation" && currentStep === "confirmation"
                      ? "bg-green-500 text-white"
                      : currentStep === "confirmation" ||
                          (currentStep === "payment" && step !== "confirmation") ||
                          (currentStep === "shipping" && (step === "information" || step === "shipping"))
                        ? "bg-green-500 text-white"
                        : "bg-[#e8e1d9] text-[#867762]"
                }`}
              >
                {currentStep === "confirmation" ||
                (currentStep === "payment" && step !== "confirmation") ||
                (currentStep === "shipping" && (step === "information" || step === "shipping")) ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span className={`text-xs ${step === currentStep ? "text-[#d35400] font-medium" : "text-[#867762]"}`}>
                {step.charAt(0).toUpperCase() + step.slice(1)}
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-1 bg-[#e8e1d9] mt-4 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#d35400]"
            initial={{ width: "0%" }}
            animate={{
              width:
                currentStep === "information"
                  ? "25%"
                  : currentStep === "shipping"
                    ? "50%"
                    : currentStep === "payment"
                      ? "75%"
                      : "100%",
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-[#f8f5f2] rounded-xl p-4 mb-8">
        <h3 className="font-serif text-lg font-medium text-[#5a3e36] mb-4">Order Summary</h3>

        <div className="space-y-2 mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-[#5a3e36]">
                {item.name} <span className="text-[#867762]">x{item.quantity}</span>
              </span>
              <span className="font-medium text-[#5a3e36]">{item.price}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-[#e8e1d9] pt-4">
          <div className="flex justify-between font-medium">
            <span className="text-[#5a3e36]">Subtotal</span>
            <span className="text-[#5a3e36]">{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-[#867762]">Shipping</span>
            <span className="text-[#867762]">Calculated at next step</span>
          </div>
        </div>
      </div>

      {/* Checkout Form */}
      {currentStep !== "confirmation" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Information Step */}
          {currentStep === "information" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="font-serif text-2xl font-bold text-[#5a3e36] mb-6">Contact Information</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[#5a3e36] mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full p-3 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[#5a3e36] mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full p-3 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#5a3e36] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#5a3e36] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full p-3 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-[#5a3e36] mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full p-3 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-[#5a3e36] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="w-full p-3 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-[#5a3e36] mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      className="w-full p-3 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-[#5a3e36] mb-1">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      className="w-full p-3 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                      required
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Shipping Step */}
          {currentStep === "shipping" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="font-serif text-2xl font-bold text-[#5a3e36] mb-6">Shipping Method</h2>

              <div className="space-y-4">
                <div className="border border-[#e8e1d9] rounded-lg p-4 cursor-pointer hover:border-[#d35400] transition-colors">
                  <div className="flex items-center">
                    <input type="radio" id="standard" name="shipping" className="mr-3" defaultChecked />
                    <label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 text-[#867762] mr-2" />
                          <span className="font-medium text-[#5a3e36]">Standard Shipping</span>
                        </div>
                        <span className="font-medium text-[#5a3e36]">$5.99</span>
                      </div>
                      <p className="text-sm text-[#867762] mt-1">Delivery in 5-7 business days</p>
                    </label>
                  </div>
                </div>

                <div className="border border-[#e8e1d9] rounded-lg p-4 cursor-pointer hover:border-[#d35400] transition-colors">
                  <div className="flex items-center">
                    <input type="radio" id="express" name="shipping" className="mr-3" />
                    <label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 text-[#867762] mr-2" />
                          <span className="font-medium text-[#5a3e36]">Express Shipping</span>
                        </div>
                        <span className="font-medium text-[#5a3e36]">$12.99</span>
                      </div>
                      <p className="text-sm text-[#867762] mt-1">Delivery in 2-3 business days</p>
                    </label>
                  </div>
                </div>

                <div className="border border-[#e8e1d9] rounded-lg p-4 cursor-pointer hover:border-[#d35400] transition-colors">
                  <div className="flex items-center">
                    <input type="radio" id="overnight" name="shipping" className="mr-3" />
                    <label htmlFor="overnight" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 text-[#867762] mr-2" />
                          <span className="font-medium text-[#5a3e36]">Overnight Shipping</span>
                        </div>
                        <span className="font-medium text-[#5a3e36]">$24.99</span>
                      </div>
                      <p className="text-sm text-[#867762] mt-1">Delivery next business day</p>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Payment Step */}
          {currentStep === "payment" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="font-serif text-2xl font-bold text-[#5a3e36] mb-6">Payment Information</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-[#5a3e36] mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    className="w-full p-3 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-[#5a3e36] mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      className="w-full p-3 pl-10 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#867762]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-[#5a3e36] mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      className="w-full p-3 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-[#5a3e36] mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      className="w-full p-3 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d35400]"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start mt-6">
                  <ShieldCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#867762]">
                    Your payment information is secure. We use industry-standard encryption to protect your data.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep !== "information" && (
              <Button
                type="button"
                className="bg-transparent border border-[#d35400] text-[#d35400] hover:bg-[#d35400] hover:text-white rounded-full px-6"
                onClick={() => setCurrentStep(currentStep === "shipping" ? "information" : "shipping")}
              >
                Back
              </Button>
            )}

            <Button
              type="submit"
              className="bg-[#d35400] hover:bg-[#e67e22] text-white rounded-full px-8 py-6"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center">
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
                  Processing...
                </span>
              ) : currentStep === "information" ? (
                "Continue to Shipping"
              ) : currentStep === "shipping" ? (
                "Continue to Payment"
              ) : (
                "Complete Order"
              )}
            </Button>
          </div>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>

          <h2 className="font-serif text-3xl font-bold text-[#5a3e36] mb-4">Thank You for Your Order!</h2>
          <p className="text-[#867762] mb-8 max-w-md mx-auto">
            Your order has been placed successfully. We've sent a confirmation email with all the details.
          </p>

          <div className="bg-[#f8f5f2] rounded-xl p-6 max-w-md mx-auto mb-8">
            <h3 className="font-serif text-lg font-medium text-[#5a3e36] mb-2">Order #RT78291</h3>
            <p className="text-sm text-[#867762] mb-4">May 7, 2025</p>

            <div className="flex items-center justify-center text-[#5a3e36] mb-2">
              <Truck className="h-5 w-5 mr-2" />
              <span>Estimated delivery: May 12-14, 2025</span>
            </div>
          </div>

          <Button className="bg-[#d35400] hover:bg-[#e67e22] text-white rounded-full px-8 py-6">
            Continue Shopping
          </Button>
        </motion.div>
      )}
    </div>
  )
}
