import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Button } from './ui/button'

interface CustomAlertProps {
  onClose: () => void
  title: string
  description: string
  buttonText?: string
  type?: 'default' | 'destructive' | 'success' | 'warning'
}

export default function CustomAlert({ onClose, title, description, buttonText, type = 'default' }: CustomAlertProps) {
  return (
    <>
      <Alert className="mb-6" variant={type}>
        <AlertTitle className="font-semibold">{title}</AlertTitle>
        <AlertDescription>
          {description}
          <Button variant="link" className="p-0 h-auto font-normal" onClick={onClose}>
            {buttonText ?? 'Check now'}
          </Button>
        </AlertDescription>
      </Alert>
    </>
  )
}
