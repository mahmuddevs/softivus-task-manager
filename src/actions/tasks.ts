"use server"

export type TaskStatus = "pending" | "completed" | "failed"

export interface Task {
  id: string
  title: string
  status: TaskStatus
  dueDate: string
}

export interface FormData {
  title: string
  description: string
  status: TaskStatus
  dueDate: string
}

export const getAllTasks = async (status?: string) => {
  const res = await fetch(
    "https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks",
    {
      method: "GET",
      cache: "no-store",
    }
  )

  if (!res.ok) throw new Error("Failed to fetch tasks")

  if (!status) {
    return await res.json()
  }

  const tasks: Task[] = await res.json()

  const tasksWithStatus = tasks.filter((task) => task.status === status)

  return tasksWithStatus
}

export const getSingleTask = async (id: string) => {
  if (!id) {
    return { success: false, message: "No ID received" }
  }
  const res = await fetch(
    `https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  )

  if (!res.ok) {
    return { success: false, message: "Faild Fetching Task" }
  }

  const task = await res.json()

  return { success: true, message: "Fetched Task", task }
}

export const addTask = async (taskData: FormData) => {
  if (!taskData) {
    return { success: false, message: "No Data Received" }
  }
  const response = await fetch(
    "https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    }
  )

  if (!response.ok) {
    throw new Error("Failed to create task")
  }

  return { success: true, message: "Task added Successfully" }
}

export const updateTask = async (id: string, taskData: FormData) => {
  if (!taskData || !id) {
    return { success: false, message: "No Data Received" }
  }
  const response = await fetch(
    `https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    }
  )

  if (!response.ok) {
    throw new Error("Failed to update task")
  }

  return { success: true, message: "Task updated Successfully" }
}

export const deleteTask = async (id: string) => {
  if (!id) {
    return { success: false, message: "No ID received" }
  }
  const res = await fetch(
    `https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks/${id}`,
    {
      method: "DELETE",
    }
  )

  if (!res.ok) {
    return { success: false, message: "Unable to delete task" }
  }
  return { success: true, message: "Task Deleted Successfully" }
}

export const getCompletedTasks = async () => {
  const res = await fetch(
    "https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks",
    {
      method: "GET",
      cache: "no-store",
    }
  )

  if (!res.ok) throw new Error("Failed to fetch tasks")

  const tasks: Task[] = await res.json()

  const completedTasks = tasks.filter((task) => task.status === "completed")

  return completedTasks.length
}
