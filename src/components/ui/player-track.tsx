import Image from "next/image"
import cover from "../../../public/cover-album_placeholder.webp"
import HeartButton from "./heart-button"

export default function PlayerTrack() {
  return (
    <div className="flex items-center gap-4 lg:ml-16">
      <div className="brutal w-14 sm:w-16">
        <Image
          src={cover}
          width={777}
          height={777}
          alt="cover album"
          style={{ borderRadius: "6px" }}
        />
      </div>
      <div>
        <div className="flex">
          <div className="font-bold sm:text-sm">Yesterday</div>
          <HeartButton isFavorite={false} className="ml-8 max-sm:hidden" />
        </div>
        <div className="text-xs sm:text-base">Noname</div>
      </div>
    </div>
  )
}
