"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define types
export type CartItem = {
  id: number
  name: string
  price: string // Now in CHF
  image: string
  quantity: number
  description: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: any, quantity?: number) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  totalItems: number
  subtotal: string
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [totalItems, setTotalItems] = useState(0)
  const [subtotal, setSubtotal] = useState("$0.00")

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("retrobloom-cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse saved cart:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("retrobloom-cart", JSON.stringify(items))

    // Calculate total items
    const itemCount = items.reduce((total, item) => total + item.quantity, 0)
    setTotalItems(itemCount)

    // Calculate subtotal
    const total = items.reduce((sum, item) => {
      const price = Number.parseFloat(item.price.replace("Fr.", ""))
      return sum + price * item.quantity
    }, 0)
    setSubtotal(`Fr. ${total.toFixed(2)}`)
  }, [items])

  // Add item to cart
  const addItem = (product: any, quantity = 1) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity }]
      }
    })

    // Open cart when adding items
    setIsCartOpen(true)
  }

  // Remove item from cart
  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Clear cart
  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
