import { ElementType } from "react"

interface RectangleCardIconProps {
  icon: ElementType
}

export function RectangleCardIcon({ icon: Icon }: RectangleCardIconProps) {
  return (
    <div className='flex self-stretch h-[300px] items-center justify-center'>
      <Icon className="text-violet-700 group-hover:text-white" size={70} />
    </div>
  )
}