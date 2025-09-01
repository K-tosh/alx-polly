"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  TrendingUp, 
  Clock, 
  Users, 
  Calendar,
  Eye,
  Plus,
  RefreshCw
} from "lucide-react"

interface Poll {
  id: number
  title: string
  description: string
  totalVotes: number
  expiresAt: string
  category: string
  isActive: boolean
  createdBy: string
  createdAt: string
  options: string[]
}

export default function PollsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "votes" | "expires">("newest")
  const [isLoading, setIsLoading] = useState(false)

  // Enhanced mock data
  const mockPolls: Poll[] = [
    {
      id: 1,
      title: "What's your favorite programming language?",
      description: "A poll to see which programming languages are most popular among developers in 2024",
      totalVotes: 156,
      expiresAt: "2024-12-31",
      category: "Technology",
      isActive: true,
      createdBy: "John Doe",
      createdAt: "2024-01-15",
      options: ["JavaScript", "Python", "TypeScript", "Rust", "Go"]
    },
    {
      id: 2,
      title: "Best framework for web development?",
      description: "Vote for your preferred web development framework for building modern applications",
      totalVotes: 89,
      expiresAt: "2024-12-25",
      category: "Technology",
      isActive: true,
      createdBy: "Jane Smith",
      createdAt: "2024-01-10",
      options: ["React", "Vue", "Angular", "Svelte", "Next.js"]
    },
    {
      id: 3,
      title: "Favorite weekend activity?",
      description: "What do you enjoy doing most during your free time on weekends?",
      totalVotes: 234,
      expiresAt: "2024-11-30",
      category: "Lifestyle",
      isActive: true,
      createdBy: "Mike Johnson",
      createdAt: "2024-01-05",
      options: ["Gaming", "Reading", "Outdoor activities", "Netflix", "Cooking"]
    },
    {
      id: 4,
      title: "Preferred coffee brewing method?",
      description: "Coffee enthusiasts, what's your go-to brewing method for the perfect cup?",
      totalVotes: 67,
      expiresAt: "2024-12-20",
      category: "Food & Drink",
      isActive: true,
      createdBy: "Sarah Wilson",
      createdAt: "2024-01-12",
      options: ["Espresso", "Pour-over", "French Press", "AeroPress", "Cold Brew"]
    },
    {
      id: 5,
      title: "Best productivity app?",
      description: "Which app helps you stay most productive and organized?",
      totalVotes: 123,
      expiresAt: "2024-12-28",
      category: "Technology",
      isActive: true,
      createdBy: "Alex Chen",
      createdAt: "2024-01-08",
      options: ["Notion", "Todoist", "Trello", "Asana", "Microsoft To Do"]
    }
  ]

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(mockPolls.map(poll => poll.category))]
    return ["all", ...cats]
  }, [])

  // Filter and sort polls
  const filteredAndSortedPolls = useMemo(() => {
    let filtered = mockPolls.filter(poll => {
      const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           poll.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || poll.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort polls
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "votes":
        filtered.sort((a, b) => b.totalVotes - a.totalVotes)
        break
      case "expires":
        filtered.sort((a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime())
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Get time until expiration
  const getTimeUntilExpiration = (expiresAt: string) => {
    const now = new Date()
    const expiration = new Date(expiresAt)
    const diffTime = expiration.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return "Expired"
    if (diffDays === 0) return "Expires today"
    if (diffDays === 1) return "Expires tomorrow"
    return `${diffDays} days left`
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors = {
      "Technology": "bg-blue-100 text-blue-800",
      "Lifestyle": "bg-green-100 text-green-800",
      "Food & Drink": "bg-orange-100 text-orange-800",
      "default": "bg-gray-100 text-gray-800"
    }
    return colors[category as keyof typeof colors] || colors.default
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">All Polls</h1>
              <p className="text-lg text-gray-600">Browse and vote on polls created by the community</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Link href="/polls/create">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Poll
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search polls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="votes">Most Votes</option>
                <option value="expires">Expires Soon</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center">
              <span className="text-sm text-gray-600">
                {filteredAndSortedPolls.length} poll{filteredAndSortedPolls.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </div>

        {/* Polls Grid */}
        {filteredAndSortedPolls.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedPolls.map((poll) => (
              <Card key={poll.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getCategoryColor(poll.category)}>
                      {poll.category}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDate(poll.createdAt)}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight line-clamp-2">{poll.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{poll.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Poll Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{poll.totalVotes} votes</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{getTimeUntilExpiration(poll.expiresAt)}</span>
                      </div>
                    </div>

                    {/* Options Preview */}
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Options:</span> {poll.options.slice(0, 3).join(", ")}
                      {poll.options.length > 3 && ` +${poll.options.length - 3} more`}
                    </div>

                    {/* Created By */}
                    <div className="text-xs text-gray-500">
                      Created by <span className="font-medium">{poll.createdBy}</span>
                    </div>

                    {/* Action Button */}
                    <Link href={`/polls/${poll.id}`} className="block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Eye className="w-4 h-4 mr-2" />
                        View & Vote
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No polls found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery || selectedCategory !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "Be the first to create a poll and start the conversation!"
                }
              </p>
              <Link href="/polls/create">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create the first poll
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {filteredAndSortedPolls.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{filteredAndSortedPolls.length}</div>
                <div className="text-sm text-gray-600">Total Polls</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {filteredAndSortedPolls.reduce((sum, poll) => sum + poll.totalVotes, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Votes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {filteredAndSortedPolls.filter(poll => new Date(poll.expiresAt) > new Date()).length}
                </div>
                <div className="text-sm text-gray-600">Active Polls</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {[...new Set(filteredAndSortedPolls.map(poll => poll.category))].length}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
