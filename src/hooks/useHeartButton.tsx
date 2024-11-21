"use client"

import { useLikesContext } from "@/context/likes/use-likes-context"
import { useState } from "react"

type Props = {
  trackId: string
  initialFavorite: boolean | undefined
}

export const useHeartButton = ({ trackId, initialFavorite }: Props) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const { incrementLikes, decrementLikes } = useLikesContext()

  const toggleFavorite = async () => {
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

  return { isFavorite, toggleFavorite }
}
