import { FormFieldProps } from './types'

export interface FormFieldWrapperProps extends FormFieldProps {
  children: React.ReactNode
  errorMessage?: string
}

export function FormFieldWrapper({ children, label, name, errorMessage, className }: FormFieldWrapperProps) {
  return (
    <div className={`space-y-0.5 ${className ? className : ''}`}>
      <label htmlFor={name} className="text-sm ml-1 font-medium">
        {label}
      </label>
      {children}
      {errorMessage && <p className="text-xs ml-1 font-bold text-red-500">{errorMessage}</p>}
    </div>
  )
}
