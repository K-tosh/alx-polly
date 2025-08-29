"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"

type AuthMode = "login" | "register" | "forgot-password"

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const { signIn, signUp, resetPassword } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    try {
      if (mode === "login") {
        const { error } = await signIn(email, password)
        if (error) {
          setError(error.message)
        } else {
          router.push("/polls")
        }
      } else if (mode === "register") {
        if (password !== confirmPassword) {
          setError("Passwords do not match")
          setLoading(false)
          return
        }
        if (password.length < 6) {
          setError("Password must be at least 6 characters")
          setLoading(false)
          return
        }
        const { error } = await signUp(email, password)
        if (error) {
          setError(error.message)
        } else {
          setMessage("Registration successful! Please check your email to confirm your account.")
          setMode("login")
        }
      } else if (mode === "forgot-password") {
        const { error } = await resetPassword(email)
        if (error) {
          setError(error.message)
        } else {
          setMessage("Password reset email sent! Please check your inbox.")
          setMode("login")
        }
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setError("")
    setMessage("")
  }

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode)
    resetForm()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">ALX Polly</h1>
          </Link>
          <p className="text-gray-600">
            {mode === "login" && "Sign in to your account"}
            {mode === "register" && "Create your account"}
            {mode === "forgot-password" && "Reset your password"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {mode === "login" && "Sign In"}
              {mode === "register" && "Sign Up"}
              {mode === "forgot-password" && "Reset Password"}
            </CardTitle>
            <CardDescription>
              {mode === "login" && "Enter your credentials to access your account"}
              {mode === "register" && "Fill in the details to create your account"}
              {mode === "forgot-password" && "Enter your email to receive a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="mt-1"
                />
              </div>

              {mode !== "forgot-password" && (
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="mt-1"
                  />
                </div>
              )}

              {mode === "register" && (
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="mt-1"
                  />
                </div>
              )}

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              {message && (
                <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">
                  {message}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  <>
                    {mode === "login" && "Sign In"}
                    {mode === "register" && "Sign Up"}
                    {mode === "forgot-password" && "Send Reset Email"}
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              {mode === "login" && (
                <>
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={() => switchMode("register")}
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                  <p className="text-sm text-gray-600">
                    <button
                      onClick={() => switchMode("forgot-password")}
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Forgot your password?
                    </button>
                  </p>
                </>
              )}

              {mode === "register" && (
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => switchMode("login")}
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}

              {mode === "forgot-password" && (
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <button
                    onClick={() => switchMode("login")}
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

