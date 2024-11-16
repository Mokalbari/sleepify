import Image from "next/image"
import userPhoto from "../../../public/userphoto.jpg"

export default function UserBadge() {
  return (
    <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:text-left">
      <div className="max-w-12">
        <Image
          src={userPhoto}
          width={128}
          height={128}
          alt="utilisateur"
          style={{
            borderRadius: "50%",
            border: "1px solid black",
            boxShadow: "2px 4px black",
          }}
        />
      </div>
      <div>
        <div className="text-xs font-bold">Juste Leblanc</div>
        <div className="text-2xs hover:cursor-pointer hover:underline">
          Sign out
        </div>
      </div>
    </div>
  )
}
