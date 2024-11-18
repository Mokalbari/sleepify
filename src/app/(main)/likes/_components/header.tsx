import { getUserInfo } from "@/lib/db/actions"

export default async function Header() {
  const userInfo = await getUserInfo()
  return (
    <header>
      <h2 className="text-md font-bold sm:text-lg lg:text-xl">
        Hi, {userInfo.firstname}!
      </h2>
      <p className="text-2xs sm:text-xs lg:text-base">
        Songs you’ve sworn your undying love to—until the next catchy beat
        steals your attention.
      </p>
    </header>
  )
}
