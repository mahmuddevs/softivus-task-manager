"use client"

import {
  deleteTask,
  getAllTasks,
  getCompletedTasks,
  Task,
} from "@/actions/tasks"
import TaskCard from "@/components/Task"
import { Clipboard } from "lucide-react"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import Loading from "./loading"

export default function Dashboard() {
  const [status, setStatus] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])
  const [completed, setCompleted] = useState<number>(0)
  const [taskLoading, setTaskLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getAllTasks(status)
      const completed = await getCompletedTasks()
      setTasks(data)
      setCompleted(completed)
      setTaskLoading(false)
    }
    fetchTasks()
  }, [status])

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { success, message } = await deleteTask(id)

          if (!success) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: message,
              showConfirmButton: false,
              timer: 1500,
            })
            return
          }

          Swal.fire({
            title: "Deleted!",
            text: message,
            icon: "success",
          })
          const updated = tasks.filter((task) => task.id !== id)
          setTasks(updated)
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Something went wrong"
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `${message}`,
            showConfirmButton: false,
            timer: 1500,
          })
        }
      }
    })
  }

  if (taskLoading) {
    return <Loading />
  }

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-xl md:text-3xl font-bold flex gap-2 items-center">
          <Clipboard /> Task Dashboard
        </h1>
        <p className="text-xl font-bold">{`(${completed} Done / ${tasks.length} Total)`}</p>
      </div>

      <div className="mb-6 flex gap-2">
        <button
          className="btn btn-outline btn-sm"
          onClick={() => {
            setStatus("")
          }}
        >
          All
        </button>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => {
            setStatus("pending")
          }}
        >
          Pending
        </button>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => {
            setStatus("completed")
          }}
        >
          Completed
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
          ))
        ) : (
          <div className="text-center text-gray-500">No tasks found.</div>
        )}
      </div>
    </section>
  )
}
