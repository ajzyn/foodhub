import tailwindConfig from '@/tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'
import { useMediaQuery } from 'react-responsive'

const fullConfig = resolveConfig(tailwindConfig)

export const useMedia = () => {
  const breakpoints = fullConfig.theme?.screens || {}

  const isSmall = useMediaQuery({ query: `(min-width: ${breakpoints.sm})` })
  const isMedium = useMediaQuery({ query: `(min-width: ${breakpoints.md})` })
  const isLarge = useMediaQuery({ query: `(min-width: ${breakpoints.lg})` })
  const isExtraLarge = useMediaQuery({ query: `(min-width: ${breakpoints.xl})` })

  return { isSmall, isMedium, isLarge, isExtraLarge }
}
