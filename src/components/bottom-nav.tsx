import { AudioLines, Heart } from "lucide-react"
import Image from "next/image"
import userPhoto from "../../public/userphoto.jpg"

export default function BottomNav() {
  return (
    <div className="bg-white py-2 text-xs">
      <nav className="">
        <menu className="flex justify-between gap-4">
          <li className="-white flex items-center gap-4 px-5 py-1">
            <AudioLines />
            <span>Tracks (5)</span>
          </li>
          <li className="max-w-9">
            <Image
              src={userPhoto}
              width={128}
              height={128}
              alt="user photo"
              style={{
                borderRadius: "50%",
                border: "1px solid black",
                boxShadow: "1px 2px black",
              }}
            />
          </li>
          <li className="flex items-center gap-4 px-5 py-1">
            <Heart />
            <span>Likes (1)</span>
          </li>
        </menu>
      </nav>
    </div>
  )
}
