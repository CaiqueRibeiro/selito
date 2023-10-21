import { Check, X } from "lucide-react";

interface SuccessOrErrorProps {
  success: boolean
}

export function SuccessOrErrorIndicator({ success }: SuccessOrErrorProps) {
  return (
    <main className="flex items-center justify-center flex-1">
      {
        success
          ?
          <div className="animate-show-up repeat-1 w-80 h-80 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="text-white h-36 w-36" />
          </div>
          :
          <div className="animate-show-up repeat-1 w-80 h-80 bg-red-500 rounded-full flex items-center justify-center">
            <X className="text-white h-36 w-36" />
          </div>
      }
    </main>
  )
}