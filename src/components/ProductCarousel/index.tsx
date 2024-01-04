'use client'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Image from "next/image"
import Link from 'next/link'

interface ProductCarouselProps {
  products: { id: string; name: string; imageUrl: string; price: string; }[]
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 36,
    }
  })

  return (
    <div ref={sliderRef} className="keen-slider flex min-h-[400px]">
      {products.map(product => {
        return (
          <Link href={`/product/${product.id}`} key={product.id} className="keen-slider__slide group flex justify-center items-center flex-col bg-gradient-to-b from-purple-950 to-violet-500 backdrop-blur-lg rounded-lg cursor-pointer relative overflow-hidden">
            <Image src={product.imageUrl} width={520} height={480} alt="" className="object-cover" />
            <footer className="
      bottom-1
      absolute
      left-1
      right-1
      flex
      justify-between
      items-center
      p-4
      bg-black/[.6]
      rounded-lg
      opacity-0
      translate-y-full
      transition
      ease-in-out
      duration-2000
      group-hover:opacity-100
      group-hover:translate-y-0">
              <strong className="text-zinc-200 text-lg">{product.name}</strong>
              <span className="text-zinc-200 text-xl font-bold">{product.price}</span>
            </footer>
          </Link>
        )
      })}
    </div>
  )
}