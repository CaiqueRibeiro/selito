'use client'

import { ReactNode, createContext, useContext, useState } from "react"

interface CartItem {
  productId: string
  productName: string
  productImage: string
  productPrice: number
  quantity: number
}

interface CartContextProps {
  items: CartItem[]
  addToCart: (item: CartItem) => void
}

const CartContext = createContext({} as CartContextProps)

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function handleAddToCart(itemToAdd: CartItem) {
      setCartItems(prevState => {
        const productAlreadyInCart = cartItems.some(foundItem => foundItem.productId === itemToAdd.productId)

        if(productAlreadyInCart) {
          return prevState
            .map(item => item.productId === itemToAdd.productId ? { ...item, quantity: item.quantity + itemToAdd.quantity }
            : item
            )
        }

        return [...prevState, { ...itemToAdd, quantity: itemToAdd.quantity }]
      })
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart: handleAddToCart }}>
      {children }
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)