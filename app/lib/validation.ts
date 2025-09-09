import { CreatePollData } from "@/app/types";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateCreatePoll(data: CreatePollData, now: () => Date = () => new Date()): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.title.trim()) {
    errors.title = "Title is required";
  }

  if (!data.description.trim()) {
    errors.description = "Description is required";
  }

  const validOptions = data.options.filter(option => option.trim());
  if (validOptions.length < 2) {
    errors.options = "At least 2 options are required";
  }

  if (data.expiresAt) {
    const expiresAtDate = new Date(data.expiresAt);
    if (isNaN(expiresAtDate.getTime()) || expiresAtDate <= now()) {
      errors.expiresAt = "Expiration date must be in the future";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}





