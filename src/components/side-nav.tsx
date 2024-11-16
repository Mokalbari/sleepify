import SleepifyLogo from "@/components/ui/sleepify-logo"
import UserBadge from "@/components/ui/user-badge"
import { cn } from "@/helpers/style"
import { AudioLines, Heart } from "lucide-react"
import Link from "next/link"

export default function SideNav() {
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
            <li className="brutal flex items-center gap-4 bg-white px-5 py-1">
              <AudioLines aria-hidden />
              <span>
                <Link href={"/"}>Tracks (5)</Link>
              </span>
            </li>

            <li className="flex items-center gap-4 px-5 py-1">
              <Heart aria-hidden />
              <span>
                <Link href={"/likes"}>Likes (0)</Link>
              </span>
            </li>
          </menu>
        </nav>
      </div>
      <UserBadge />
    </div>
  )
}
