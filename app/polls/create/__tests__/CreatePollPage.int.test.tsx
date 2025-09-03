import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CreatePollPage from '@/app/polls/create/page'

// Mock useAuth to bypass loading and provide a user
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'u1', email: 't@example.com' }, loading: false }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Spy on alert and console.log to verify side effects
const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

function renderWithProviders(ui: React.ReactElement) {
  return render(ui)
}

describe('CreatePollPage integration', () => {
  beforeEach(() => {
    alertSpy.mockClear()
    consoleSpy.mockClear()
  })

  it('submits valid form and shows success alert (happy path)', async () => {
    renderWithProviders(<CreatePollPage />)

    fireEvent.change(screen.getByLabelText('Poll Title'), { target: { value: 'My Poll' } })
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Pick one' } })

    const optionInputs = screen.getAllByPlaceholderText(/Option \d+/)
    fireEvent.change(optionInputs[0], { target: { value: 'A' } })
    fireEvent.change(optionInputs[1], { target: { value: 'B' } })

    fireEvent.click(screen.getByRole('button', { name: 'Create Poll' }))

    await waitFor(() => expect(alertSpy).toHaveBeenCalledWith('Poll created successfully!'))

    // Asserts console log fired with form data
    expect(consoleSpy).toHaveBeenCalledWith('Creating poll:', expect.objectContaining({
      title: 'My Poll',
      description: 'Pick one',
      options: ['A', 'B']
    }))

    // Inputs reset after success
    expect(screen.getByLabelText('Poll Title')).toHaveValue('')
    expect(screen.getByLabelText('Description')).toHaveValue('')
  })

  it('shows validation errors for missing fields (edge case)', async () => {
    renderWithProviders(<CreatePollPage />)

    fireEvent.click(screen.getByRole('button', { name: 'Create Poll' }))

    expect(await screen.findByText('Title is required')).toBeInTheDocument()
    expect(screen.getByText('Description is required')).toBeInTheDocument()
    expect(screen.getByText('At least 2 options are required')).toBeInTheDocument()
  })
})


