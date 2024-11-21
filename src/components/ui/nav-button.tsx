import { cn } from "@/utils/helpers/style"
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
  const isDisabled =
    direction === "left" ? currentPage <= 1 : currentPage >= totalPages

  const newPage = direction === "left" ? currentPage - 1 : currentPage + 1

  const handleClick = () => {
    if (!isDisabled) {
      window.location.href = createPageUrl(newPage)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(
        "rounded-md border border-black bg-white transition-all duration-200",
        {
          "bg-grey-500 text-grey-700 cursor-not-allowed": isDisabled,
          "hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2":
            !isDisabled,
        },
      )}
      {...props}
    >
      {direction === "left" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  )
}
