import { X } from "lucide-react";
import ProductInput from "../ProductInput";

interface NewProductModalProps {
  show: boolean
  hideModal: () => void
  product?: any
}

export default function NewProductModal({ show, product, hideModal }: NewProductModalProps) {
  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    hideModal()
  };

  return (
    <div
      onClick={handleInnerClick}
      className={`absolute top-0 ${show ? 'z-50 flex items-center justify-center' : 'hidden'} bg-zinc-900/80 w-screen h-screen`}>
      <div onClick={(e) => e.stopPropagation()} className="relative flex bg-white rounded-sm p-8 h-4/5 w-4/5 lg:w-3/5 xl:w-2/5 lg:p-5">
        <div  className="cursor-pointer z-90 absolute top-2 right-2" onClick={handleInnerClick}>
          <X className="text-zinc-400 hover:text-violet-700" size={24} />
        </div>
        <ProductInput />
      </div>
    </div>
  )
}