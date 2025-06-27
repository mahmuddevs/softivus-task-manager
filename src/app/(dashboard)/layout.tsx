"use client"

import Sidebar from "@/components/Sidebar"
import { ReactNode, useEffect, useState } from "react"
import { Menu } from "lucide-react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileOpen(!isMobileOpen)
    } else {
      setIsCollapsed(!isCollapsed)
    }
  }

  return (
    <div className="min-h-screen bg-base-100 relative overflow-x-hidden">
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        toggleSidebar={toggleSidebar}
        closeMobileSidebar={() => setIsMobileOpen(false)}
      />

      <div
        className={`transition-all duration-300 pt-4 px-4 relative z-10 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <div className="lg:hidden mb-4">
          <button
            onClick={toggleSidebar}
            className="btn btn-ghost btn-sm"
            aria-label="Open Sidebar"
          >
            <Menu />
          </button>
        </div>

        <main className="max-w-full overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}
