export interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
  quantity: number
  paymentId: string
  description: string | null
  active: boolean
}