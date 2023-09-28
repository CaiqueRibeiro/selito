'use client'
import Image from "next/image"
import Link from 'next/link'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { useSession } from 'next-auth/react'

import camiseta from '../../../public/1.png'

export default function Home() {
  const [firstSliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 36,
    }
  })

  const [secondSliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 36,
    }
  })


  const { data: session } = useSession()

  return (
    <main className="flex-1 flex flex-col items-center justify-start w-screen gap-8 py-10 px-4">
      <section className="keen-slider flex w-full max-w-[1280px] flex-col gap-4">
        <h1 className="text-zinc-50 text-4xl">Highlights</h1>
        <div ref={firstSliderRef} className="keen-slider flex w-full min-h-[400px]">
          <Link href={`/product`} key={1} className="keen-slider__slide group flex justify-center items-center flex-col bg-gradient-to-b from-teal-600 to-indigo-500 backdrop-blur-lg rounded-lg cursor-pointer relative overflow-hidden">
            <Image src={camiseta} width={520} height={480} alt="" className="object-cover" />
            <footer className="
          absolute
          bottom-1
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
              <strong className="text-zinc-200 text-lg">Produto 1</strong>
              <span className="text-zinc-200 text-xl font-bold">R$ 29,00</span>
            </footer>
          </Link>


          <Link href={`/product`} key={2} className="keen-slider__slide group flex justify-center items-center flex-col bg-gradient-to-b from-teal-600 to-indigo-500 backdrop-blur-lg rounded-lg cursor-pointer relative overflow-hidden">
            <Image src={camiseta} width={520} height={480} alt="" className="object-cover" />
            <footer className="
          absolute
          bottom-1
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
              <strong className="text-zinc-200 text-lg">Produto 1</strong>
              <span className="text-zinc-200 text-xl font-bold">R$ 29,00</span>
            </footer>
          </Link>

          <Link href={`/product`} key={3} className="keen-slider__slide group flex justify-center items-center flex-col bg-gradient-to-b from-teal-600 to-indigo-500 backdrop-blur-lg rounded-lg cursor-pointer relative overflow-hidden">
            <Image src={camiseta} width={520} height={480} alt="" className="object-cover" />
            <footer className="
          absolute
          bottom-1
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
              <strong className="text-zinc-200 text-lg">Produto 1</strong>
              <span className="text-zinc-200 text-xl font-bold">R$ 29,00</span>
            </footer>
          </Link>

          <Link href={`/product`} key={4} className="keen-slider__slide group flex justify-center items-center flex-col bg-gradient-to-b from-teal-600 to-indigo-500 backdrop-blur-lg rounded-lg cursor-pointer relative overflow-hidden">
            <Image src={camiseta} width={520} height={480} alt="" className="object-cover" />
            <footer className="
          absolute
          bottom-1
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
              <strong className="text-zinc-200 text-lg">Produto 1</strong>
              <span className="text-zinc-200 text-xl font-bold">R$ 29,00</span>
            </footer>
          </Link>
        </div>
      </section>

      <section className="keen-slider flex w-full max-w-[1280px] flex-col gap-4">
        <h1 className="text-zinc-50 text-4xl">Clothes</h1>

        <div ref={secondSliderRef} className="keen-slider flex w-full min-h-[400px]">
          <Link href={`/product`} key={1} className="keen-slider__slide group flex justify-center items-center flex-col bg-gradient-to-b from-teal-600 to-indigo-500 backdrop-blur-lg rounded-lg cursor-pointer relative overflow-hidden">
            <Image src={camiseta} width={520} height={480} alt="" className="object-cover" />
            <footer className="
          absolute
          bottom-1
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
              <strong className="text-zinc-200 text-lg">Produto 1</strong>
              <span className="text-zinc-200 text-xl font-bold">R$ 29,00</span>
            </footer>
          </Link>


          <Link href={`/product`} key={2} className="keen-slider__slide group flex justify-center items-center flex-col bg-gradient-to-b from-teal-600 to-indigo-500 backdrop-blur-lg rounded-lg cursor-pointer relative overflow-hidden">
            <Image src={camiseta} width={520} height={480} alt="" className="object-cover" />
            <footer className="
          absolute
          bottom-1
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
              <strong className="text-zinc-200 text-lg">Produto 1</strong>
              <span className="text-zinc-200 text-xl font-bold">R$ 29,00</span>
            </footer>
          </Link>

          <Link href={`/product`} key={3} className="keen-slider__slide group flex justify-center items-center flex-col bg-gradient-to-b from-teal-600 to-indigo-500 backdrop-blur-lg rounded-lg cursor-pointer relative overflow-hidden">
            <Image src={camiseta} width={520} height={480} alt="" className="object-cover" />
            <footer className="
          absolute
          bottom-1
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
              <strong className="text-zinc-200 text-lg">Produto 1</strong>
              <span className="text-zinc-200 text-xl font-bold">R$ 29,00</span>
            </footer>
          </Link>

          <Link href={`/product`} key={4} className="keen-slider__slide group flex justify-center items-center flex-col bg-gradient-to-b from-teal-600 to-indigo-500 backdrop-blur-lg rounded-lg cursor-pointer relative overflow-hidden">
            <Image src={camiseta} width={520} height={480} alt="" className="object-cover" />
            <footer className="
          absolute
          bottom-1
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
              <strong className="text-zinc-200 text-lg">Produto 1</strong>
              <span className="text-zinc-200 text-xl font-bold">R$ 29,00</span>
            </footer>
          </Link>
        </div>
      </section>
    </main>
  )
}
