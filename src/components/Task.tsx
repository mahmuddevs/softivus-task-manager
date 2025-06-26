"use client"

import { Task } from "@/actions/tasks"
import { formatDate } from "@/utils/dateFormatter"
import { useRouter } from "next/navigation"

interface Props {
  task: Task
}

export default function TaskCard({ task }: Props) {
  const router = useRouter()

  return (
    <div className="card bg-base-100 shadow-md p-4 mb-4 hover:drop-shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <h2 className="card-title text-lg">{task.title}</h2>
        <span
          className={`badge ${
            task.status === "completed" ? "badge-success" : "badge-warning"
          }`}
        >
          {task.status}
        </span>
      </div>
      <p className="text-sm text-gray-500">Due: {formatDate(task.dueDate)}</p>
      <div className="mt-3 flex gap-2">
        <button
          className="btn btn-sm btn-info"
          onClick={() => router.push(`/tasks/${task.id}`)}
        >
          View
        </button>
        <button className="btn btn-sm btn-primary">Edit</button>
        <button className="btn btn-sm btn-error">Delete</button>
      </div>
    </div>
  )
}
