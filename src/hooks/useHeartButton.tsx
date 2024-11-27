"use client"

import { useLikesContext } from "@/context/likes/use-likes-context"
import { addToLikes, deleteFromLikes } from "@/server/actions"
import { startTransition, useOptimistic } from "react"

type Props = {
  trackId: string
  initialFavorite: boolean | undefined
}

/**
 * MUTATING DATA FROM favorites -- useHeartButton
 *
 * useHeartButton is a simple hook that specializes in mutating data
 * It accepts as a prop the current trackId + initialFavorite (which is mapped in a tracklist from a playlist fetch)
 *
 * From that, it's main function is to toggle between favorite / not favorite
 * It uses useOptimistic to update the state, as the info has the server latency may impact the user experience.
 * It increments / decrements the like count in the sidenav and bottom nav thanks to the likescontext
 * And it returns a state + the setter function
 */

export const useHeartButton = ({ trackId, initialFavorite }: Props) => {
  const [optimisticFavorite, addOptimisticFavorite] = useOptimistic(
    initialFavorite ?? false, // as useOptimistic expects a strict bool, not an undefined value
    (currentState, newState: boolean) => newState,
  )
  const { incrementLikes, decrementLikes } = useLikesContext()
  const toggleFavorite = async () => {
    const newFavoriteState = !optimisticFavorite

    startTransition(() => addOptimisticFavorite(newFavoriteState))

    try {
      if (newFavoriteState) {
        const response = await addToLikes(trackId)
        if (!response.success) throw new Error("Failed to add to likes")
        incrementLikes()
      } else {
        const response = await deleteFromLikes(trackId)
        if (!response.success) throw new Error("Failed to delete from likes")
        decrementLikes()
      }
    } catch (error) {
      // This is necessary to revert the optimistic UI in case of error
      addOptimisticFavorite(!newFavoriteState)
      console.error("Failed to toggle favorite", error)
    }
  }

  return { isFavorite: optimisticFavorite, toggleFavorite }
}
