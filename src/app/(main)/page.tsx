import LyricsPlayer from "@/components/lyrics-player"
import Pagination from "@/components/pagination"
import TrackList from "./_components/track-list"
import TracksHeader from "./_components/tracks-header"
import { getTotalPages } from "./actions"

type SearchParams = Promise<{ page?: string }>

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams?.page) || 1
  const totalPages = await getTotalPages()

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
