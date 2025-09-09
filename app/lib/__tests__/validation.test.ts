import { describe, it, expect } from 'vitest'
import { validateCreatePoll } from '@/app/lib/validation'

describe('validateCreatePoll', () => {
  it('returns valid for a correct payload (happy path)', () => {
    const result = validateCreatePoll({
      title: 'Best Programming Language',
      description: 'Vote for your favorite',
      options: ['JavaScript', 'Python'],
      expiresAt: undefined,
    })

    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual({})
  })

  it('returns errors for missing fields and insufficient options', () => {
    const result = validateCreatePoll({
      title: '  ',
      description: '',
      options: ['Only one option', '   '],
      expiresAt: undefined,
    })

    expect(result.isValid).toBe(false)
    expect(result.errors).toMatchObject({
      title: 'Title is required',
      description: 'Description is required',
      options: 'At least 2 options are required',
    })
  })

  it('rejects past or invalid expiration dates', () => {
    const fixedNow = new Date('2024-01-01T12:00:00Z')
    const now = () => fixedNow

    const past = validateCreatePoll({
      title: 'T',
      description: 'D',
      options: ['A', 'B'],
      expiresAt: '2023-12-31T23:59:59Z',
    }, now)
    expect(past.isValid).toBe(false)
    expect(past.errors.expiresAt).toBe('Expiration date must be in the future')

    const invalid = validateCreatePoll({
      title: 'T',
      description: 'D',
      options: ['A', 'B'],
      expiresAt: 'not-a-date',
    }, now)
    expect(invalid.isValid).toBe(false)
    expect(invalid.errors.expiresAt).toBe('Expiration date must be in the future')
  })
})





