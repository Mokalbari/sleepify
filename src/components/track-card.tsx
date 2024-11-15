import Image from "next/image"
import cover from "../../public/cover-album_placeholder.webp"
import HeartButton from "./ui/heart-button"

export default function TrackCard() {
  return (
    <div className="brutal flex items-center justify-between bg-white px-6 py-3 outline sm:py-4">
      <div className="flex items-center">
        <div className="relative w-12 sm:w-16">
          <Image
            src={cover}
            alt="album cover"
            width={777}
            height={777}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className="ml-4">
          <h3 className="font-bold sm:text-sm">Common Freestyle</h3>
          <div className="text-xs sm:text-sm">RH Factor</div>
        </div>
      </div>
      <HeartButton isFavorite={false} className="sm:mr-12" />
    </div>
  )
}
