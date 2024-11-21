import { useContext } from "react"
import { LikesContext } from "./likes-context"

export const useLikesContext = () => {
  const context = useContext(LikesContext)

  if (!context) {
    throw new Error("useLikesContext must be used within a provider")
  }

  return context
}
