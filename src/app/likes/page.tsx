import Header from "./_components/header"
import Table from "./_components/table"

export default function Page() {
  return (
    <div className="px-4 py-6">
      <Header />
      <main className="mt-4">
        <Table />
      </main>
    </div>
  )
}
