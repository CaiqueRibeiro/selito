import { Check } from "lucide-react";

export function SuccessIndicator() {
  return (
    <main className="flex items-center justify-center flex-1">
      <div className="animate-show-up repeat-1 w-80 h-80 bg-green-500 rounded-full flex items-center justify-center">
        <Check className="text-white h-36 w-36" />
      </div>
    </main>
  )
}