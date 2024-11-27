"use client"

import { ContextProvider } from "@/lib/types/definitions"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

/**
 * Lyrics Providers is part of the TanStack query implementation
 * it is bound to the useLyrics hook defined in @/hooks/useLyrics
 * It allows children of server component to use this provider later down the tree
 */
export default function LyricsProvider({ children }: ContextProvider) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
