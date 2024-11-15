import TrackList from "./_components/track-list"
import TracksHeader from "./_components/tracks-header"

export default async function Page() {
  return (
    <div className="px-4 py-6 sm:px-8 sm:py-9 lg:px-16 lg:py-12">
      <TracksHeader />
      <TrackList />
    </div>
  )
}
