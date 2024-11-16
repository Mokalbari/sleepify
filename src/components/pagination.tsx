"use client"

import { generatePagination } from "@/lib/functions/generatePagination"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

interface Props {
  totalPages: number
  currentPage: number
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pagination = generatePagination(currentPage, totalPages)

  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div>
      {" "}
      {pagination.map((page) => (
        <Link key={page} href={createPageURL(page)}>
          <button className="">{page}</button>
        </Link>
      ))}
    </div>
  )
}
