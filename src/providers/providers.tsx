// providers.tsx

'use client'

import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { Store } from '@reduxjs/toolkit'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [queryClient] = React.useState(() => new QueryClient())
  const storeRef = React.useRef<Store>()
  if (!storeRef.current) {
    storeRef.current = store
  }

  return (
    <Provider store={storeRef.current}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  )
}

export default Providers
