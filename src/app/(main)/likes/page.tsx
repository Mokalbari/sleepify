import Header from "./_components/header"
import Table from "./_components/table"
import { getUsersLikes } from "./actions"

export default async function Page() {
  const likedSongs = await getUsersLikes()
  console.log(likedSongs)
  return (
    <div className="px-4 py-6 sm:px-9 sm:py-8 lg:px-16 lg:py-12">
      <Header />
      <main className="mt-4 sm:mt-16">
        <div className="brutal min-h-[400px] rounded-md bg-white p-4">
          <Table />
        </div>
      </main>
    </div>
  )
}
