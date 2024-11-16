import { cn } from "@/helpers/style"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  currentPage: number
  totalPages: number
  direction: "right" | "left"
  createPageUrl: (pageNumber: number | string) => string
}

export default function NavButton({
  currentPage,
  totalPages,
  direction,
  createPageUrl,
  ...props
}: Props) {
  const isDisabled = (pageTarget: number) => currentPage === pageTarget

  return (
    <button
      onClick={() => {
        const newPage = direction === "left" ? currentPage - 1 : currentPage + 1
        window.location.href = createPageUrl(newPage)
      }}
      disabled={direction === "left" ? isDisabled(1) : isDisabled(totalPages)}
      className={cn("rounded-md border border-black bg-white", {
        "bg-grey-500 cursor-not-allowed":
          direction === "left" ? isDisabled(1) : isDisabled(totalPages),
      })}
      {...props}
    >
      <span>{direction === "left" ? <ChevronLeft /> : <ChevronRight />}</span>
    </button>
  )
}
