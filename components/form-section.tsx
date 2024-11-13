import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export default function FormSection({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <>
      <Card className="w-full max-w-2xl mx-auto mb-4">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </>
  )
}
