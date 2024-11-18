"use client"
import { useLikesContext } from "@/context/likes-context"
import { Heart } from "lucide-react"
import { useState } from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFavorite: boolean
  trackId: string
}

export default function HeartButton({
  isFavorite: initialFavorite,
  trackId,
  className,
  type = "button",
  ...props
}: Props) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const { incrementLikes, decrementLikes } = useLikesContext()

  const handleClick = async (trackId: string) => {
    try {
      if (isFavorite) {
        const res = await fetch("/api/likes", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ track_id: trackId }),
        })

        if (!res.ok) throw new Error("Failed to remove favorite")
        decrementLikes()
        setIsFavorite(false)
      } else {
        const res = await fetch("/api/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ track_id: trackId }),
        })

        if (!res.ok) throw new Error("Failed to add a new favorite track")
        incrementLikes()
        setIsFavorite(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button onClick={() => handleClick(trackId)} type={type} {...props}>
      {isFavorite ? (
        <Heart className={className} fill="red" stroke="red" />
      ) : (
        <Heart className={className} />
      )}
    </button>
  )
}
