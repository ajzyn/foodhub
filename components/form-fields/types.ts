import { InputProps } from '@/components/ui/input'

export interface FormFieldProps extends InputProps {
  label: string
  name: string
  placeholder?: string
  className?: string
}

export interface SelectOption {
  value: string
  label: string
}
