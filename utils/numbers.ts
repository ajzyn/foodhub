import { isNil } from 'lodash'

export const isValidNumber = (value: string | null | undefined) => {
  if (isNil(value)) {
    return false
  }

  const num = parseInt(value, 10)
  return !isNaN(num) && Number.isInteger(num)
}

/**
 * Checks if the given value is a valid integer
 * @param value - value to check (string, null or undefined)
 * @returns true if value is a valid integer, false otherwise
 */

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
