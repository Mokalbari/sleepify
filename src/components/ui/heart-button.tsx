"use client"
import { useHeartButton } from "@/hooks/useHeartButton"
import { cn } from "@/utils/helpers/style"
import { Heart } from "lucide-react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFavorite: boolean | undefined
  trackId: string
}

export default function HeartButton({
  isFavorite: initialFavorite,
  trackId,
  className,
  type = "button",
  ...props
}: Props) {
  const { isFavorite, toggleFavorite } = useHeartButton({
    trackId,
    initialFavorite,
  })

  return (
    <button
      onClick={toggleFavorite}
      type={type}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
      className={cn(className)}
      {...props}
    >
      <Heart
        className={cn({
          "hover:animate-pulse hover:fill-gray-500 hover:stroke-gray-500":
            isFavorite,
          "hover:animate-pulse hover:fill-red/80 hover:stroke-red/80":
            !isFavorite,
        })}
        fill={isFavorite ? "red" : "none"}
        stroke={isFavorite ? "red" : "currentColor"}
        aria-hidden="true"
      />
      <span className="sr-only">
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </span>
    </button>
  )
}
