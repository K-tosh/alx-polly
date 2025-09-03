"use client"

import React, { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { CreatePollData } from "@/app/types"
import { validateCreatePoll } from "@/app/lib/validation"
import Link from "next/link"
import { Plus, X } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function CreatePollPage() {
  const [formData, setFormData] = useState<CreatePollData>({
    title: "",
    description: "",
    options: ["", ""],
    expiresAt: undefined,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const addOption = () => {
    if (formData.options.length < 10) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, ""]
      }))
    }
  }

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      setFormData(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index)
      }))
    }
  }

  const updateOption = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map((option, i) => i === index ? value : option)
    }))
  }

  const validateForm = () => {
    const result = validateCreatePoll(formData)
    setErrors(result.errors)
    return result.isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Here you would typically send the data to your API
      console.log("Creating poll:", formData)
      alert("Poll created successfully!")
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        options: ["", ""],
        expiresAt: undefined,
      })
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/polls" className="text-blue-600 hover:text-blue-500">
              ← Back to Polls
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">Create New Poll</h1>
            <p className="mt-2 text-gray-600">Create a new poll for others to vote on</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Poll Details</CardTitle>
              <CardDescription>
                Fill in the details for your new poll
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Poll Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter poll title"
                    className="mt-1"
                  />
                  {errors.title && (
                    <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your poll"
                    rows={3}
                    className="mt-1"
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                <div>
                  <Label>Poll Options</Label>
                  <div className="space-y-3 mt-2">
                    {formData.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                        />
                        {formData.options.length > 2 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeOption(index)}
                            className="px-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  {errors.options && (
                    <p className="text-red-600 text-sm mt-1">{errors.options}</p>
                  )}
                  {formData.options.length < 10 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addOption}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  )}
                </div>

                <div>
                  <Label htmlFor="expiresAt">Expiration Date (Optional)</Label>
                  <Input
                    id="expiresAt"
                    type="datetime-local"
                    value={formData.expiresAt || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiresAt: e.target.value }))}
                    className="mt-1"
                  />
                  {errors.expiresAt && (
                    <p className="text-red-600 text-sm mt-1">{errors.expiresAt}</p>
                  )}
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="flex-1">
                    Create Poll
                  </Button>
                  <Link href="/polls" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}

