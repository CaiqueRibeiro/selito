import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { SuccessOrErrorIndicator } from "../SuccessOrErrorIndicator";
import CategoryInput from "../CategoryInput";

interface NewProductModalProps {
  show: boolean
  hideModal: () => void
  categoryCreated: boolean
  setCategoryCreated: (state: boolean) => void
}

export default function NewCategoryModal({ show, hideModal, categoryCreated, setCategoryCreated }: NewProductModalProps) {
  const [creationSuccess, setCreationSuccess] = useState<boolean>(false)

  let timeoutId: any

  function handleInnerClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    hideModal()
  }

  function handleCategoryCreated(success: boolean) {
    if(success) {
      setCreationSuccess(true)
    } else {
      setCreationSuccess(false)
    }

    setCategoryCreated(true)

    timeoutId = setTimeout(() => {
      setCategoryCreated(false)
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
    }, [])

  return (
    <div
      onClick={handleInnerClick}
      className={`absolute top-0 ${show ? 'z-50 flex items-center justify-center' : 'hidden'} bg-zinc-900/80 w-screen h-screen`}>
      <div onClick={(e) => e.stopPropagation()} className="relative flex bg-white rounded-sm p-8 w-4/5 lg:w-3/5 xl:w-2/5 lg:p-5">
        <div  className="cursor-pointer z-90 absolute top-2 right-2" onClick={handleInnerClick}>
          <X className="text-zinc-400 hover:text-violet-700" size={24} />
        </div>
        {
          categoryCreated ?
          <SuccessOrErrorIndicator success={creationSuccess} />
          :
          <CategoryInput handleCategoryCreated={handleCategoryCreated} />
        }
      </div>
    </div>
  )
}