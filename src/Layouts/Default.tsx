import { Suspense, ReactNode } from 'react'
import { PreloaderFull } from '@/components/Misc/Preloader'

interface DefaultLayoutProps {
  children?: ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return <Suspense fallback={<PreloaderFull />}>{children}</Suspense>
}

export default DefaultLayout
