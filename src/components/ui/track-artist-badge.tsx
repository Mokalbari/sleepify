import Image from "next/image"

interface Props {
  trackImage: string
  trackName: string
  artistName: string[]
}

export default function TrackArtistBadge({
  trackImage,
  trackName,
  artistName,
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
