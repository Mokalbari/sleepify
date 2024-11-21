"use client"

import { ContextProvider, Count } from "@/lib/types/definitions"
import { useState } from "react"
import { LikesContext } from "./likes-context"

interface LikesContextProvider extends ContextProvider {
  initialCount: number
}

export default function LikesProvider({
  children,
  initialCount,
}: LikesContextProvider) {
  const [likedCount, setLikedCount] = useState<Count>({
    count: initialCount,
  })
  const incrementLikes = () => {
    setLikedCount((prev) => ({ count: prev.count + 1 }))
  }

  const decrementLikes = () => {
    setLikedCount((prev) => ({ count: prev.count - 1 }))
  }

  return (
    <LikesContext.Provider
      value={{ likedCount, incrementLikes, decrementLikes }}
    >
      {children}
    </LikesContext.Provider>
  )
}
