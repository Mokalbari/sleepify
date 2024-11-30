import { UserInfo } from "@/lib/types/definitions"
import Image from "next/image"

export default function UserBadge({ firstname, lastname, avatar }: UserInfo) {
  return (
    <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:text-left">
      <div className="max-w-12">
        <Image
          src={avatar || "/avatar_placeholder.webp"}
          width={128}
          height={128}
          alt="utilisateur"
          className="rounded-full border border-black shadow-half-full"
        />
      </div>
      <div>
        <div className="text-xs font-bold">
          {firstname} {lastname}
        </div>
        <div className="text-2xs hover:cursor-pointer hover:underline">
          Sign out
        </div>
      </div>
    </div>
  )
}
