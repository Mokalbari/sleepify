"use client"

import { useLikesContext } from "@/context/likes-context"
import { cn } from "@/utils/helpers/style"
import { AudioLines, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import userPhoto from "../../public/userphoto.jpg"

export default function BottomNav() {
  const { likedCount } = useLikesContext()
  const pathname = usePathname()

  return (
    <div className="bg-white py-2 text-xs">
      <nav className="">
        <menu className="flex items-center justify-between gap-4">
          <li className="-white flex items-center gap-4 px-5 py-1">
            <Link href={"/"}>
              <div className="flex flex-col items-center">
                <AudioLines />
                <span
                  className={cn({
                    "font-bold text-accessBlue": pathname === "/",
                  })}
                >
                  Tracks (28)
                </span>
              </div>
            </Link>
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
            <Link href={"/likes"}>
              <div className="flex flex-col items-center">
                <Heart />
                <span
                  className={cn({
                    "font-bold text-accessBlue": pathname === "/likes",
                  })}
                >
                  Likes ({likedCount.count})
                </span>
              </div>
            </Link>
          </li>
        </menu>
      </nav>
    </div>
  )
}
