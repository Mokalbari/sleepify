"use client"

import { cn } from "@/utils/helpers/style"
import { AudioLines, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import userPhoto from "../../public/userphoto.jpg"
import { useLikesContext } from "@/context/likes/use-likes-context"

export default function BottomNav() {
  const { likedCount } = useLikesContext()
  const pathname = usePathname()

  return (
    <div className="bg-white py-2 text-xs">
      <nav role="navigation">
        <menu className="flex items-center justify-between gap-4">
          <li role="menuitem" className="px-5 py-1">
            <Link
              href={"/"}
              aria-current={pathname === "/" ? "page" : undefined}
            >
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
          <li role="menuitem" className="max-w-9">
            <Image
              src={userPhoto}
              width={128}
              height={128}
              alt="Profile photo of the current user"
              className="rounded-full border border-black"
            />
          </li>
          <li role="menuitem" className="px-5 py-1">
            <Link
              href={"/likes"}
              aria-current={pathname === "/likes" ? "page" : undefined}
            >
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
