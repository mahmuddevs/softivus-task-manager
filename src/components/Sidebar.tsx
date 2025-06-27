"use client"

import { useTheme } from "@/providers/ThemeProvider"
import { Home, Menu, Moon, Plus, Sun } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
  isCollapsed: boolean
  isMobileOpen: boolean
  toggleSidebar: () => void
  closeMobileSidebar: () => void
}

export default function Sidebar({
  isCollapsed,
  isMobileOpen,
  toggleSidebar,
  closeMobileSidebar,
}: Props) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen z-50 bg-base-200 text-base-content 
        transition-all duration-300 flex flex-col
        ${isMobileOpen ? "w-64" : isCollapsed ? "w-20" : "w-64"} 
        ${isMobileOpen ? "lg:hidden" : "hidden lg:flex"}
      `}
    >
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <span
            className="text-xl font-bold cursor-pointer"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className="btn btn-sm btn-ghost"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>
      </div>

      <ul className="menu w-full px-2 flex-1 space-y-2">
        <li>
          <Link
            href="/"
            onClick={closeMobileSidebar}
            className={`flex w-full ${
              isCollapsed ? "justify-center" : " md:justify-start"
            }  ${pathname === "/" ? "active" : ""}`}
          >
            <Home />
            {!isCollapsed && <span>Home</span>}
          </Link>
        </li>
        <li>
          <Link
            href="/tasks/add"
            onClick={closeMobileSidebar}
            className={`flex w-full ${
              isCollapsed ? "justify-center" : " md:justify-start"
            }  ${pathname === "/tasks/add" ? "active" : ""}`}
          >
            <Plus />
            {!isCollapsed && <span>Add Task</span>}
          </Link>
        </li>
      </ul>
    </aside>
  )
}
