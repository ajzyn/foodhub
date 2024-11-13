import { useFormContext } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { FormFieldProps } from './types'
import { FormFieldWrapper } from './wrapper'

export function FormTextareaField({ label, name, placeholder, className }: FormFieldProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const errorMessage = errors[name]?.message as string | undefined

  return (
    <FormFieldWrapper label={label} name={name} errorMessage={errorMessage} className={className}>
      <Textarea
        id={name}
        placeholder={placeholder}
        {...register(name)}
        aria-invalid={!!errorMessage}
        className={errorMessage ? 'bg-red-50 border-red-500' : ''}
      />
    </FormFieldWrapper>
  )
}
