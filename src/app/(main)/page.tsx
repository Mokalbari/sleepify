import LyricsPlayer from "@/components/lyrics-player"
import Pagination from "@/components/pagination"
import { Metadata } from "next"
import TrackList from "./_components/track-list"
import TracksHeader from "./_components/tracks-header"
import { getTotalPages } from "./actions"

export const metadata: Metadata = {
  title: "Sleepify | Top 28",
  description: "Discover now Sleepify Top 28. Top 50 are overrated.",
}

type SearchParams = Promise<{ page?: string }>

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams?.page) || 1
  const totalPages = (await getTotalPages()) || 1

  return (
    <>
      <div className="px-4 py-6 sm:px-8 sm:py-9 lg:px-16 lg:py-12">
        <TracksHeader />
        <TrackList currentPage={currentPage} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
      <LyricsPlayer />
    </>
  )
}
