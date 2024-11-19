import Header from "./_components/header"
import Table from "./_components/table"

export default async function Page() {
  return (
    <div className="px-4 py-6 sm:px-9 sm:py-8 lg:px-16 lg:py-12">
      <Header />
      <main className="mt-4 sm:mt-16">
        <div className="brutal min-h-[400px] rounded-md bg-white p-4 lg:min-h-[500px]">
          <Table />
        </div>
      </main>
    </div>
  )
}
