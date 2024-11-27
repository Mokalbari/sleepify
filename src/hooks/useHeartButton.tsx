"use client"

import { useLikesContext } from "@/context/likes/use-likes-context"
import { addToLikes, deleteFromlikes } from "@/server/actions"
import { useState } from "react"

type Props = {
  trackId: string
  initialFavorite: boolean | undefined
}

export const useHeartButton = ({ trackId, initialFavorite }: Props) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const { incrementLikes, decrementLikes } = useLikesContext()

  const toggleFavorite = async () => {
    if (isFavorite) {
      await deleteFromlikes(trackId)
      decrementLikes()
    } else {
      await addToLikes(trackId)
      incrementLikes()
    }
    setIsFavorite((prevState) => !prevState)
  }

  return { isFavorite, toggleFavorite }
}
