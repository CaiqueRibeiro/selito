import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { SuccessOrErrorIndicator } from "../SuccessOrErrorIndicator";
import ProductStockInput from "../ProductStockInput";

interface ProductStockModalProps {
  show: boolean
  product?: any
  hideModal: () => void
}

export default function ProductStockModal({ show, product, hideModal }: ProductStockModalProps) {
  const [stockUpdated, setStockUpdated] = useState<boolean>(false)
  const [creationSuccess, setCreationSuccess] = useState<boolean>(false)

  let timeoutId: any

  function handleInnerClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    hideModal()
  }

  function handleProductCreated(success: boolean) {
    if(success) {
      setCreationSuccess(true)
    } else {
      setCreationSuccess(false)
    }

    setStockUpdated(true)

    timeoutId = setTimeout(() => {
      setStockUpdated(false)
      setCreationSuccess(false)
    }, 2000)
  }

    useEffect(() => {
      return () => {
        // Clear the timeout when the component unmounts
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [timeoutId])

  return (
    <div
      onClick={handleInnerClick}
      className={`absolute top-0 left-0 z-50 flex items-center justify-center bg-zinc-900/80 w-screen h-screen`}>
      <div onClick={(e) => e.stopPropagation()} className="relative flex bg-white rounded-sm p-8 w-4/5 lg:w-3/5 xl:w-2/5 2xl:w-1/5 lg:p-5">
        <div  className="cursor-pointer z-90 absolute top-2 right-2" onClick={handleInnerClick}>
          <X className="text-zinc-400 hover:text-violet-700" size={24} />
        </div>
        {
          stockUpdated ?
          <SuccessOrErrorIndicator success={creationSuccess} />
          :
          <ProductStockInput product={product} handleStockAction={handleProductCreated} />
        }
      </div>
    </div>
  )
}