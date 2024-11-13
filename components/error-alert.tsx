import { Terminal } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from './ui/alert'

export default function ErrorAlert({
  title = 'Wystąpił błąd',
  description = 'Spróbuj ponownie później.'
}: {
  title?: string
  description?: string
}) {
  return (
    <Alert variant="destructive">
      <Terminal className="h-4 w-4" />
      <AlertTitle className="font-bold">{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
