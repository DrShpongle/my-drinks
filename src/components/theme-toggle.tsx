'use client'

import * as React from 'react'
import { IoMoon, IoSunny } from 'react-icons/io5'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={null} size="icon" onClick={toggleTheme}>
            <IoSunny className="text-xl md:text-2xl rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <IoMoon className="absolute text-xl md:text-2xl rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
