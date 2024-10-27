import { ThemeProvider } from '@/components/providers/theme-provider'
import { SessionProvider } from '@/components/providers/session-provider'

export default function CombinedProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}
