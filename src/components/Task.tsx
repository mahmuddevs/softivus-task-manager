import { Task } from "@/actions/tasks"
import { formatDate } from "@/utils/dateFormatter"
import Link from "next/link"
// import { useRouter } from "next/navigation"

interface Props {
  task: Task
}

export default function TaskCard({ task }: Props) {
  // const router = useRouter()

  return (
    <div className="card bg-base-100 shadow-md p-4 mb-4 hover:drop-shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <h2 className="card-title text-lg">{task.title}</h2>
        <span
          className={`badge ${
            task.status === "completed"
              ? "badge-success"
              : task.status === "failed"
              ? "badge-error"
              : task.status === "pending"
              ? "badge-neutral"
              : " badge-accent"
          }`}
        >
          {task.status}
        </span>
      </div>
      <p className="text-sm text-gray-500">Due: {formatDate(task.dueDate)}</p>
      <div className="mt-3 flex gap-2">
        <Link
          href={`/tasks/${task.id}`}
          className="btn btn-sm btn-info"
          // onClick={() => router.push()}
        >
          View
        </Link>
        <Link
          href={`/tasks/${task.id}/edit`}
          className="btn btn-sm btn-primary"
          // onClick={() => router.push(`/tasks/${task.id}/edit`)}
        >
          Edit
        </Link>
        <button className="btn btn-sm btn-error">Delete</button>
      </div>
    </div>
  )
}
