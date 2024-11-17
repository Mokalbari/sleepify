import HeartButton from "@/components/ui/heart-button"
import TrackArtistBadge from "@/components/ui/track-artist-badge"
import { cn } from "@/helpers/style"
import { LikedSongs } from "@/lib/types/definitions"
import { Play } from "lucide-react"
import { getUsersLikes } from "../actions"
import BadgeStack from "./badge-stack"

export default async function Table() {
  const likedSongs: LikedSongs[] = await getUsersLikes()

  return (
    <table className="w-full">
      <thead className="text-xs">
        <tr className="border-b border-b-black">
          <th className="p-2 text-left">Artist - Track</th>
          <th className="text-left max-lg:hidden">Smashed play button</th>
          <th className="min-w-fit p-2 text-right">Social - Play</th>
        </tr>
      </thead>
      <tbody>
        {likedSongs.map((song) => (
          <tr
            key={song.track_id}
            className="border-b border-black last-of-type:border-b-0"
          >
            <td className="p-2">
              <TrackArtistBadge
                track_image={song.image_url}
                artist_name={song.artists}
                track_name={song.track_name}
              />
            </td>
            <td className="max-lg:hidden">34 plays... You okay?</td>
            <td className="p-2 text-right lg:flex lg:h-full lg:items-center lg:justify-end lg:gap-8">
              <div className="text-2xs lg:hidden">34 plays</div>
              <div className="max-lg:hidden">
                <BadgeStack />
              </div>
              <div className="flex justify-end gap-4">
                <HeartButton
                  isFavorite={true}
                  className={cn("w-4 sm:w-5 lg:w-6")}
                />
                <Play className={cn("w-4 sm:w-5 lg:w-6")} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
