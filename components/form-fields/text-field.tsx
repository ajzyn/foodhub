import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { FormFieldProps } from './types'
import { FormFieldWrapper } from './wrapper'

export function FormTextField({ label, name, placeholder, className, ...props }: FormFieldProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const errorMessage = errors[name]?.message as string | undefined

  return (
    <FormFieldWrapper label={label} name={name} errorMessage={errorMessage} className={className}>
      <Input
        id={name}
        placeholder={placeholder}
        {...register(name)}
        aria-invalid={!!errorMessage}
        className={errorMessage ? 'bg-red-50 border-red-500' : ''}
        {...props}
      />
    </FormFieldWrapper>
  )
}
