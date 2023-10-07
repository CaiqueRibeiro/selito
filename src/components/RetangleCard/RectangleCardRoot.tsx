import Link from "next/link"
import { ReactNode } from "react"

interface RectangleCardRootProps {
  children: ReactNode,
  destination: string
}

export function RectangleCardRoot({ children, destination }: RectangleCardRootProps) {
  return (
    <Link href={destination} className="group flex flex-col items-start justify-between min-h-[200px] border border-violet-600/30 p-4 text-slate-300 font-semibold rounded-sm gap-2 hover:bg-violet-700">
      {children}
    </Link>
  )
}