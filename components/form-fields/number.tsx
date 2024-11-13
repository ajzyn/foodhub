import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { FormFieldProps } from './types'
import { FormFieldWrapper } from './wrapper'

interface FormNumberFieldProps extends FormFieldProps {
  min?: number
  max?: number
  step?: string
}

export function FormNumberField({ label, name, placeholder, className, min, max, step }: FormNumberFieldProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const errorMessage = errors[name]?.message as string | undefined

  return (
    <FormFieldWrapper label={label} name={name} errorMessage={errorMessage} className={className}>
      <Input
        id={name}
        type="number"
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        {...register(name, { valueAsNumber: true })}
        aria-invalid={!!errorMessage}
        className={errorMessage ? 'bg-red-50 border-red-500' : ''}
      />
    </FormFieldWrapper>
  )
}
