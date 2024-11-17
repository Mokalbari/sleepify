export default function Page() {
  return (
    <div className="grid min-h-screen place-content-center">
      <form
        action="#"
        className="brutal flex flex-col gap-4 rounded-md bg-white p-4"
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            className="rounded-md border border-black"
            type="email"
            required
          />
        </div>
        <div>
          <label className="flex flex-col" htmlFor="password">
            Password:
          </label>
          <input
            className="rounded-md border border-black"
            type="password"
            required
          />
        </div>
      </form>
    </div>
  )
}
