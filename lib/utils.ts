import { clsx, type ClassValue } from 'clsx'
import { isNil } from 'lodash'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidNumber = (value: string | null | undefined) => {
  if (isNil(value)) {
    return false
  }

  const num = parseInt(value, 10)
  return !isNaN(num) && Number.isInteger(num)
}

export const parseNumberWithDefault = (value: string | null | undefined, defaultValue: number): number => {
  if (isNil(value)) {
    return defaultValue
  }

  const parsedNumber = parseInt(value, 10)

  if (isNaN(parsedNumber)) {
    return defaultValue
  }

  return parsedNumber
}
