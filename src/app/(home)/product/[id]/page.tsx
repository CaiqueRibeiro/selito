'use client'
import Image from "next/image"

import camiseta from '../../../../../public/1.png'
import { CoinsIcon } from "lucide-react"


export default function Product({ params }: { params: { id: string } }) {

  return (
    <main className="flex-1 flex flex-col items-center justify-start w-screen gap-8 pt-7">
      <div className="flex flex-col w-full max-w-[1280px] gap-14 flex-1 border-b border-slate-200 border-opacity-10 p-8">
        <div className="flex gap-6 flex-col lg:flex-row">
          <div className="flex justify-center items-center flex-col bg-gradient-to-b from-purple-950 to-violet-500 backdrop-blur-lg rounded-lg cursor-pointer relative overflow-hidden">
            <Image src={camiseta} width={520} height={480} alt="" className="object-cover" />
          </div>

          <div className="flex flex-col flex-1 items-center justify-around">
            <h3 className="text-zinc-50 text-3xl font-bold">CAMISETA XYZ</h3>
            <div className="flex flex-col items-center justify-center gap-8 md:w-96">
              <h1 className="text-zinc-50 text-6xl font-bold">R$ 29,00</h1>
              <button className="
          self-stretch
          flex
          items-center
          justify-center
          gap-4
          rounded-sm
          py-2
          font-semibold
          text-zinc-800
          bg-violet-500
          transition
          ease-in-out
          hover:text-zinc-50
          hover:bg-violet-900
          duration-300
          ">
                Buy
              </button>
            </div>
          </div>
        </div>

        <span className="text-justify text-zinc-50 font-light">
          Pellentesque in ligula sodales, blandit sapien sit amet, vehicula augue. Fusce sed dignissim lectus. Vestibulum nec libero ut diam porta accumsan. Nulla commodo tortor leo, sit amet efficitur mauris tristique eget. Nunc sollicitudin lacus vulputate erat consectetur ornare eu vel eros. Suspendisse bibendum nec quam sed porttitor.
          <br />
          <br />
          Sed lacinia mauris sed velit finibus pellentesque. Curabitur pellentesque pharetra erat. Proin varius ante nec nisl aliquet, eu eleifend nisi varius. Donec ex lectus, cursus et facilisis sed, pulvinar nec libero. Donec dictum magna eu orci lobortis sollicitudin. In sit amet nunc at sapien dictum convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus urna odio, luctus vel iaculis nec, scelerisque eget sapien.
        </span>
      </div>

    </main>
  )
}
