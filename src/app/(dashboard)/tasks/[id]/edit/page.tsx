"use client"

import { useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FormData, getSingleTask, updateTask } from "@/actions/tasks"
import Swal from "sweetalert2"
import dayjs from "dayjs"
import Loading from "@/app/(dashboard)/loading"

export default function EditTask() {
  const { id } = useParams()
  const taskId = id!.toString()
  const router = useRouter()
  const [taskLoading, setTaskLoading] = useState(true)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  useEffect(() => {
    if (!taskId) return

    const fetchTask = async () => {
      const { success, task } = await getSingleTask(taskId)

      if (!success) {
        router.replace("/not-found")
      } else {
        reset({
          ...task,
          dueDate: dayjs(task.dueDate).format("YYYY-MM-DD"),
          status: task.status?.toLowerCase() ?? "",
        })
      }
      setTaskLoading(false)
    }

    fetchTask()
  }, [taskId, reset, router])

  const onSubmit = async (data: FormData) => {
    setLoading(true)

    try {
      const { success, message } = await updateTask(taskId, data)
      if (!success) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${message}`,
          showConfirmButton: false,
          timer: 1500,
        })
        return
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${message}`,
        showConfirmButton: false,
        timer: 1500,
      })
      reset()
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  if (taskLoading) {
    return <Loading />
  }

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="w-full md:w-xl bg-base-100 shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Add New Task</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              className={`input input-bordered w-full ${
                errors.title ? "input-error" : ""
              }`}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-error text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className={`textarea textarea-bordered w-full ${
                errors.description ? "textarea-error" : ""
              }`}
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-error text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select
              className={`select select-bordered w-full ${
                errors.status ? "select-error" : ""
              }`}
              {...register("status", { required: "Status is required" })}
            >
              <option value="">Select status</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="text-error text-sm mt-1">{errors.status.message}</p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Due Date</span>
            </label>
            <input
              type="date"
              className={`input input-bordered w-full ${
                errors.dueDate ? "input-error" : ""
              }`}
              {...register("dueDate", { required: "Due date is required" })}
            />
            {errors.dueDate && (
              <p className="text-error text-sm mt-1">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          <div className="mt-6">
            <button
              className={`btn btn-primary w-full ${
                loading ? "btn-disabled" : ""
              }`}
              type="submit"
            >
              {loading ? "Updating..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
