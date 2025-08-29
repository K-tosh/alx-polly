"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"

export default function Navigation() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { user, signOut } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleSignOut = async () => {
    await signOut()
  }

  // Don't render navigation until client-side hydration is complete
  if (!mounted) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-blue-600">ALX Polly</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">ALX Polly</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/polls">
              <Button
                variant={isActive("/polls") ? "default" : "ghost"}
                className={isActive("/polls") ? "" : "text-gray-600 hover:text-gray-900"}
              >
                View Polls
              </Button>
            </Link>
            
            {user && (
              <Link href="/polls/create">
                <Button
                  variant={isActive("/polls/create") ? "default" : "ghost"}
                  className={isActive("/polls/create") ? "" : "text-gray-600 hover:text-gray-900"}
                >
                  Create Poll
                </Button>
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user.email}
                </span>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button variant="outline">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

