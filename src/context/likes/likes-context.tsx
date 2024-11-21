"use client"

import type { Count } from "@/lib/types/definitions"
import { createContext } from "react"

/**
 * LikesProvider manages the count of likes in the application.
 * Provides state and actions (addLike, removeLike) to update the count.
 */
export type LikesContextType = {
  likedCount: Count
  incrementLikes: () => void
  decrementLikes: () => void
}

export const LikesContext = createContext<LikesContextType | undefined>(
  undefined,
)
