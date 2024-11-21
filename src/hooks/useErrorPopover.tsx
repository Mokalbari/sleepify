"use client"

import { useState } from "react"

export const useErrorPopover = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const openPopover = () => {
    setIsPopoverOpen(true)
    setTimeout(() => {
      setIsPopoverOpen(false)
    }, 3000)
  }

  return { isPopoverOpen, openPopover }
}
