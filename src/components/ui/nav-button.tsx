"use client"
import { usePaginationUrls } from "@/hooks/usePaginationUrls"
import { cn } from "@/utils/helpers/style"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

type Props = {
  currentPage: number
  totalPages: number
  direction: "right" | "left"
}

export default function NavButton({
  currentPage,
  totalPages,
  direction,
}: Props) {
  const { createPageUrl } = usePaginationUrls()
  const isDisabled =
    direction === "left" ? currentPage <= 1 : currentPage >= totalPages

  const newPage = direction === "left" ? currentPage - 1 : currentPage + 1

  return (
    <Link
      scroll={false}
      href={createPageUrl(newPage)}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault()
          return
        }
      }}
      className={cn(
        "rounded-md border border-black bg-white transition-all duration-200",
        {
          "bg-grey-500 text-grey-700 cursor-not-allowed": isDisabled,
          "hover:bg-blue-500 hover:text-white": !isDisabled,
        },
      )}
    >
      {direction === "left" ? <ChevronLeft /> : <ChevronRight />}
    </Link>
  )
}
