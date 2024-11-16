import HeartButton from "@/components/ui/heart-button"
import TrackArtistBadge from "@/components/ui/track-artist-badge"
import { cn } from "@/helpers/style"
import { Play } from "lucide-react"
import cover from "../../../../public/cover-album_placeholder.webp"

export default function Table() {
  const fakeArray = ["Rh Factor, Nosia"]

  return (
    <table className="brutal w-full bg-white">
      <thead className="text-xs">
        <tr className="border-b border-b-black">
          <th className="p-2 text-left">Artist - Track</th>
          <th className="max-lg:hidden">Counter</th>
          <th className="p-2 text-right">Social - Play</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-black">
          <td className="p-2">
            <TrackArtistBadge
              trackImage={cover}
              artistName={fakeArray}
              trackName="Common Freestyle"
            />
          </td>
          <td className="max-lg:hidden">34 plays... You okay?</td>
          <td className="p-2 text-right">
            <div className="text-2xs">34 plays</div>
            <div className="flex justify-end gap-4 sm:hidden">
              <HeartButton isFavorite={false} className="w-4" />
              <Play className={cn("w-4")} />
            </div>
          </td>
        </tr>
        <tr className="">
          <td>
            <TrackArtistBadge
              trackImage={cover}
              artistName={fakeArray}
              trackName="Common Freestyle"
            />
          </td>
          <td className="max-lg:hidden">34 plays... You okay?</td>
          <td>couscous</td>
        </tr>
      </tbody>
    </table>
  )
}
