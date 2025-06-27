import { getSingleTask } from "@/actions/tasks"
import { formatDate } from "@/utils/dateFormatter"

export default async function ViewTaskPage({
  params,
}: {
  params: { id: string }
}) {
  const { task } = await getSingleTask(params.id)

  return (
    <section className="global-container mx-auto max-w-3xl px-6 py-8">
      <div className="card bg-base-100 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-extrabold mb-6">{task.title}</h1>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-base leading-relaxed">
            {task.description || "No description provided."}
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm ">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Status:</span>
            <span
              className={`badge ${
                task.status.toLowerCase() === "completed"
                  ? "badge-success"
                  : "badge-warning"
              } px-3 py-1 text-sm font-medium`}
            >
              {task.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Due Date:</span>
            <span className="">{formatDate(task.dueDate)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
