import Link from "next/link"

export default function NotFound() {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="w-full md:w-8/12 bg-base-100 shadow-md rounded-lg p-8 text-center space-y-6">
        <h1 className="text-4xl font-bold text-error">404 - Not Found</h1>
        <p className="text-base-content text-lg">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    </section>
  )
}
