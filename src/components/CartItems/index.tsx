import { useCart } from "@/contexts/CartContext"
import CartItem from "./CartItem"

export default function CartItems() {
  const { items } = useCart()
  return (
    <div className="col-span-2 row-span-3 flex flex-col items-center justify-start bg-white p-4 rounded-sm shadow-lg overflow-y-scroll">
      {
        items.map(item => {
          return <CartItem key={item.productId} product={item} />
        })
      }
    </div>
  )
}