'use client'

import { Skeleton } from '@/components/Skeleton'
import { useSearchParams } from 'next/navigation'

export default function SearchLoading() {
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm mt-11 text-zinc-50">
        Results to: <span className="font-semibold">{query}</span>
      </p>
      
      <div className="flex-1 w-full max-w-[1280px] grid sm: grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-6 xl:px-0">
        <Skeleton className="h-[400px] w-[400px]" />
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
      </div>
    </div>
  )
}