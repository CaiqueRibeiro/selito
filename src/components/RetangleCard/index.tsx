import { ShoppingBasket } from "lucide-react"
import { ElementType } from "react"

interface RectangleCardProps {
  title: string
  icon: ElementType
}

export function RectangleCard({ title, icon: Icon }: RectangleCardProps) {
  return (
    <div className="flex flex-col items-start justify-between min-h-[200px] border border-violet-600/30 p-4 text-slate-300 font-semibold rounded-sm gap-2">
      <h3>{title}</h3>
      <div className='flex self-stretch h-[300px] items-center justify-center'>
        <Icon className="text-violet-700" size={70} />
      </div>
    </div>

  )
}

interface CardButtonProps extends RectangleCardProps{
  action: () => void
}

export function CardButton({ action, title, icon }: CardButtonProps) {
  return (
    <button onClick={action}>
      <RectangleCard title={title} icon={icon} />
    </button>
  )
}