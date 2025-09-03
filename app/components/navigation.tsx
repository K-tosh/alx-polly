"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
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
            
            <Link href="/polls/create">
              <Button
                variant={isActive("/polls/create") ? "default" : "ghost"}
                className={isActive("/polls/create") ? "" : "text-gray-600 hover:text-gray-900"}
              >
                Create Poll
              </Button>
            </Link>

            <Link href="/auth">
              <Button variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

