"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"

export default function PollsPage() {
  // Mock data for demonstration
  const mockPolls = [
    {
      id: 1,
      title: "What's your favorite programming language?",
      description: "A poll to see which programming languages are most popular among developers",
      totalVotes: 156,
      expiresAt: "2024-12-31"
    },
    {
      id: 2,
      title: "Best framework for web development?",
      description: "Vote for your preferred web development framework",
      totalVotes: 89,
      expiresAt: "2024-12-25"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Polls</h1>
          <p className="mt-2 text-gray-600">Browse and vote on polls created by the community</p>
        </div>

        <div className="mb-6">
          <Link href="/polls/create">
            <Button size="lg">
              Create New Poll
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockPolls.map((poll) => (
            <Card key={poll.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{poll.title}</CardTitle>
                <CardDescription>{poll.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total Votes:</span>
                    <span className="font-medium">{poll.totalVotes}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Expires:</span>
                    <span className="font-medium">{poll.expiresAt}</span>
                  </div>
                  <Link href={`/polls/${poll.id}`} className="block">
                    <Button className="w-full" variant="outline">
                      View Poll
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockPolls.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No polls available yet.</p>
            <Link href="/polls/create" className="mt-4 inline-block">
              <Button>Create the first poll!</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
