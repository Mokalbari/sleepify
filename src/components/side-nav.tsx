"use client"

import SleepifyLogo from "@/components/ui/sleepify-logo"
import UserBadge from "@/components/ui/user-badge"
import { useLikesContext } from "@/context/likes-context"
import { cn } from "@/helpers/style"
import { Count, UserInfo } from "@/lib/types/definitions"
import { AudioLines, Heart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
  tracksCount: Count
  userInfo: UserInfo
}

export default function SideNav({ tracksCount, userInfo }: Props) {
  const { likedCount } = useLikesContext()
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "h-screen max-w-56 rounded-r-md border border-black bg-softBlue shadow-half-full max-sm:hidden",
        "px-6 py-10",
        "lg:max-w-80",
        "sticky left-0 top-0",
        "z-20 flex flex-col justify-between",
      )}
    >
      <div>
        <Link href={"/"}>
          <h1 className="flex items-center text-sm font-bold uppercase">
            <span className="cursor-pointer">
              <SleepifyLogo sizes="40" />
            </span>
            <span>Sleepify</span>
          </h1>
        </Link>
        <nav role="navigation" className="mt-12 text-xs">
          <menu className="flex flex-col gap-4">
            <li
              className={cn("flex items-center gap-4 px-5 py-1", {
                "brutal bg-white": pathname === "/",
              })}
            >
              <AudioLines aria-hidden />
              <span>
                <Link href={"/"}>Tracks ({tracksCount.total_likes})</Link>
              </span>
            </li>

            <li
              className={cn("flex items-center gap-4 px-5 py-1", {
                "brutal bg-white": pathname === "/likes",
              })}
            >
              <Heart aria-hidden />
              <span>
                <Link href={"/likes"}>Likes ({likedCount.total_likes})</Link>
              </span>
            </li>
          </menu>
        </nav>
      </div>
      <UserBadge {...userInfo} />
    </div>
  )
}
