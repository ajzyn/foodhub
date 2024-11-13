import { useFormContext } from 'react-hook-form'
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import { FormFieldProps, SelectOption } from './types'
import { Controller } from 'react-hook-form'
import { FormFieldWrapper } from './wrapper'

interface FormSelectFieldProps extends FormFieldProps {
  options: SelectOption[]
}

export function FormSelectField({ label, name, options, className }: FormSelectFieldProps) {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  const errorMessage = errors[name]?.message as string | undefined

  return (
    <FormFieldWrapper label={label} name={name} errorMessage={errorMessage} className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger id={name} className={errorMessage ? 'bg-red-50 border-red-500' : ''}>
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent position="popper">
              {options.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </FormFieldWrapper>
  )
}
