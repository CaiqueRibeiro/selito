'use client'

import { ReactNode, createContext, useContext, useMemo, useState } from "react"

interface CartItem {
  productId: string
  productName: string
  productImage: string
  productPrice: number
  quantity: number
  paymentId: string
}

interface CheckoutItemDetails {
  productId: string,
  paymentId: string,
  quantity: number
}

interface CartContextProps {
  items: CartItem[]
  totalValue: number
  addToCart: (item: CartItem) => void
  changeQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  goToCheckoutPage: (product?: CheckoutItemDetails[]) => Promise<void>
}

const CartContext = createContext({} as CartContextProps)

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const totalValue = useMemo(() => {
    const totalValue = cartItems.reduce((acc, current) => {
      acc += current.productPrice * current.quantity
      return acc
    }, 0)
    return totalValue
  }, [cartItems])

  function handleAddToCart(itemToAdd: CartItem) {
    setCartItems(prevState => {
      const productAlreadyInCart = cartItems.some(foundItem => foundItem.productId === itemToAdd.productId)
      if (productAlreadyInCart) {
        return prevState
          .map(item => item.productId === itemToAdd.productId ? { ...item, quantity: item.quantity + itemToAdd.quantity }
            : item
          )
      }
      return [...prevState, { ...itemToAdd, quantity: itemToAdd.quantity }]
    })
  }

  function changeQuantity(productId: string, quantity: number) {
    if (quantity <= 0) return
    setCartItems(prevState => {
      return prevState
        .map(item => item.productId === productId ? { ...item, quantity: quantity }
          : item
        )
    })
  }

  function removeItem(productId: string) {
    const productInCart = cartItems.some(foundItem => foundItem.productId === productId)
    if (!productInCart) return
    const newCartItems = cartItems.filter(item => item.productId !== productId)
    setCartItems(newCartItems)
  }

  function clearCart() {
    setCartItems([])
  }

  async function goToCheckoutPage(product?: CheckoutItemDetails[]) {
    const productsToCheckout = product ?? cartItems
    let productDetails = productsToCheckout.map(item => {
      return {
        product_id: item.productId,
        price: item.paymentId,
        quantity: item.quantity
      }
    })
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/order`, {
      method: "POST",
      body: JSON.stringify({
        user_id: 'clo20w00s0000mp08tw4q7vnn',
        checkout_details: productDetails
      })
    })
    const { url } = await response.json()
    clearCart()
    window.open(url, '_blank')
  }

  return (
    <CartContext.Provider value={{
      items: cartItems,
      totalValue: totalValue,
      addToCart: handleAddToCart,
      changeQuantity,
      removeItem,
      clearCart,
      goToCheckoutPage
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)