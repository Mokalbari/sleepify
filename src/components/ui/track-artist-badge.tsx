import { TrackList } from "@/lib/types/definitions"
import Image from "next/image"

type Props = Pick<TrackList, "track_image" | "track_name" | "artist_name">

export default function TrackArtistBadge({
  track_image: trackImage,
  track_name: trackName,
  artist_name: artistName,
}: Props) {
  return (
    <div className="flex items-center">
      <div className="relative w-12 sm:w-16">
        <Image
          src={trackImage}
          alt={`Album cover of ${trackName}`}
          width={640}
          height={640}
          style={{ borderRadius: "50%" }}
        />
      </div>
      <div className="ml-4">
        <h3 className="text-xs font-bold sm:text-base">{trackName}</h3>
        <div className="text-2xs sm:text-xs">{artistName.join(", ")}</div>
      </div>
    </div>
  )
}
