import dayjs from "dayjs"

export function formatDate(dateStr: string): string {
  return dayjs(dateStr).format("MMM D, YYYY")
}
