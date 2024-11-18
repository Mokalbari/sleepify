"use client"

import { Count } from "@/lib/types/definitions"
import { createContext, ReactNode, useContext, useState } from "react"

// Créer un context
// Ce contexte prend en paramètre un initial count qui vient du serveur
// ce contexte propose une state avec un counteur qui est initialisé = serveur
// ce contexte propose deux fonctions : une fonction pour incrémenter + décrémenter une valeur

// Enrober le layout.tsx du context
// update heart button pour incrémenter / décrémenter
// updatesidenav avec les valeurs du context.

type LikesContextType = {
  likedCount: Count
  incrementLikes: () => void
  decrementLikes: () => void
}

type LikesProviderProps = { children: ReactNode; initialCount: number }

const LikesContext = createContext<LikesContextType>({
  likedCount: { count: 0 },
  incrementLikes: () => {},
  decrementLikes: () => {},
})

export default function LikesProvider({
  children,
  initialCount,
}: LikesProviderProps) {
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
