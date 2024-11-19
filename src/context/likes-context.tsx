"use client"

import type {
  ContextProvider,
  Count,
  LikesContextType,
} from "@/lib/types/definitions"
import { createContext, useContext, useState } from "react"

interface LikesContextProvider extends ContextProvider {
  initialCount: number
}

const LikesContext = createContext<LikesContextType>({
  likedCount: { count: 0 },
  incrementLikes: () => {},
  decrementLikes: () => {},
})

export default function LikesProvider({
  children,
  initialCount,
}: LikesContextProvider) {
  const [likedCount, setLikedCount] = useState<Count>({ count: initialCount })
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

export const useLikesContext = () => {
  const context = useContext(LikesContext)

  if (!context) {
    throw new Error("useLikesContext must be used within a provider")
  }

  return context
}
