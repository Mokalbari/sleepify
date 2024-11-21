"use client"

import { useContext } from "react"
import { SleepifyContext } from "./sleepify-context"

export const useSleepify = () => {
  const context = useContext(SleepifyContext)
  if (!context) {
    throw new Error("useSleepify must be used within a SleepifyProvider")
  }
  return context
}
