import { getSingleTask } from "@/actions/tasks"
import { formatDate } from "@/utils/dateFormatter"

export default async function ViewTaskPage({
  params,
}: {
  params: { id: string }
}) {
  const task = await getSingleTask(params.id)

  return (
    <section className="global-container mx-auto px-4 py-6">
      <div className="card bg-base-100 shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">{task.title}</h1>

        <div className="mb-4">
          <span className="font-semibold text-sm text-gray-500">
            Description:
          </span>
          <p className="mt-1 text-base">
            {task.description || "No description provided."}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div>
            <span className="font-medium">Status:</span>
            <span
              className={`ml-2 badge ${
                task.status === "Completed" ? "badge-success" : "badge-warning"
              }`}
            >
              {task.status}
            </span>
          </div>
          <div>
            <span className="font-medium">Due Date:</span>
            <span className="ml-2">{formatDate(task.dueDate)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
