"use client"

import { cn } from "@/helpers/style"
import { generatePagination } from "@/lib/functions/generatePagination"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import NavButton from "./ui/nav-button"

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
    <div className="my-10 flex justify-center gap-6">
      <div>
        <NavButton
          currentPage={currentPage}
          totalPages={totalPages}
          direction="left"
          createPageUrl={createPageURL}
        />
      </div>
      <div className="flex gap-4">
        {" "}
        {pagination.map((page) => (
          <Link key={page} href={createPageURL(page)}>
            <button
              className={cn("rounded-md border border-black bg-white px-2", {
                "bg-deepBlue font-bold text-white": page === currentPage,
              })}
            >
              {page}
            </button>
          </Link>
        ))}
      </div>
      <div>
        <NavButton
          currentPage={currentPage}
          totalPages={totalPages}
          direction="right"
          createPageUrl={createPageURL}
        />
      </div>
    </div>
  )
}
