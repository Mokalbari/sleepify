"use client"

import { useSleepifyPlayer } from "@/hooks/use-sleepify/useSleepifyPlayer"
import { createContext } from "react"

type SleepifyContextType = ReturnType<typeof useSleepifyPlayer>

export const SleepifyContext = createContext<SleepifyContextType | null>(null)
