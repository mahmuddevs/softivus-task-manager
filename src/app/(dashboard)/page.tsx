"use client"

import { getAllTasks, Task } from "@/actions/tasks"
import TaskCard from "@/components/Task"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [status, setStatus] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getAllTasks(status)
      setTasks(data)
    }

    fetchTasks()
  }, [status])

  const handleDelete = () => {
    console.log("working")
  }

  return (
    <section className="global-container global-margin">
      <h1 className="text-3xl font-bold mb-6">📋 Task Dashboard</h1>

      {/* Filter bar */}
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

      {/* Task list */}
      <div className="grid md:grid-cols-2 gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="text-center text-gray-500">No tasks found.</div>
        )}
      </div>
    </section>
  )
}
