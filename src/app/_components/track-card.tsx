import CardPlayControl from "@/app/_components/card-play-control"
import Image from "next/image"

interface Props {
  trackName: string
  artistName: string[]
  trackImage: string
  trackUrl: string | null
}
export default function TrackCard({
  trackName,
  artistName,
  trackImage,
  trackUrl,
}: Props) {
  return (
    <li className="brutal flex items-center justify-between rounded-md bg-white px-6 py-3 sm:py-3">
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
      <CardPlayControl
        trackUrl={trackUrl}
        trackName={trackName}
        artistName={artistName}
        previewImage={trackImage}
      />
    </li>
  )
}
