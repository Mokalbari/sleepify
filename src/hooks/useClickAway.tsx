"use client"

import { useEffect } from "react"

export const useClickAway = (
  ref: React.RefObject<HTMLElement>,
  onClickAway: (event: MouseEvent | TouchEvent) => void,
  isActive: boolean,
) => {
  useEffect(() => {
    const handleClickAway = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickAway(event)
      }
    }

    if (isActive) {
      document.addEventListener("mousedown", handleClickAway)
      document.addEventListener("touchstart", handleClickAway)
    } else {
      document.removeEventListener("mousedown", handleClickAway)
      document.removeEventListener("touchstart", handleClickAway)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickAway)
      document.removeEventListener("touchstart", handleClickAway)
    }
  }, [isActive, ref, onClickAway])
}
