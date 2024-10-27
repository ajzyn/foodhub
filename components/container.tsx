import { clsx } from 'clsx'

export const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={clsx('container mx-auto my-4', className)}>{children}</div>
}
