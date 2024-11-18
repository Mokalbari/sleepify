"use client"
import { Heart } from "lucide-react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFavorite: boolean
  trackId: string
}

export default function HeartButton({
  isFavorite,
  trackId,
  className,
  type = "button",
  ...props
}: Props) {
  const handleClick = async (trackId: string) => {
    try {
      if (isFavorite) {
        const res = await fetch("/api", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ track_id: trackId }),
        })

        if (!res.ok) throw new Error("Failed to remove favorite")
      } else {
        const res = await fetch("/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ track_id: trackId }),
        })

        if (!res.ok) throw new Error("Failed to add a new favorite track")
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
