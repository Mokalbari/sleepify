"use client"

import { usePathname, useSearchParams } from "next/navigation"

export function usePaginationUrls() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageUrl = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return { createPageUrl }
}
