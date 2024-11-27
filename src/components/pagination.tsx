"use client"

import { usePaginationUrls } from "@/hooks/usePaginationUrls"
import { generatePagination } from "@/utils/functions/generatePagination"
import { cn } from "@/utils/helpers/style"
import Link from "next/link"
import NavButton from "./ui/nav-button"

interface Props {
  totalPages: number
  currentPage: number
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const pagination = generatePagination(currentPage, totalPages)
  const { createPageUrl } = usePaginationUrls()

  return (
    <nav
      className="my-10 flex items-center justify-center gap-6"
      aria-label="Pagination navigation"
    >
      {/* Previous Button */}
      <NavButton
        currentPage={currentPage}
        totalPages={totalPages}
        direction="left"
        aria-label="Go to previous page"
      />

      {/* Page Links */}
      <ul className="flex gap-4">
        {pagination.map((page) => (
          <li
            className={cn(
              "w-8 rounded-md border border-black bg-white px-2 text-center",
              "hover:cursor-pointer hover:bg-blue-500 hover:font-bold hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              {
                "bg-deepBlue font-bold text-white": page === currentPage,
              },
            )}
            key={page}
          >
            <Link
              href={createPageUrl(page)}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              className={""}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>

      {/* Next Button */}
      <NavButton
        currentPage={currentPage}
        totalPages={totalPages}
        direction="right"
        aria-label="Go to next page"
      />
    </nav>
  )
}
