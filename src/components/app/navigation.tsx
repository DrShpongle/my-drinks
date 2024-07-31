import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'
import Favorites from '@/components/favorites'
import Logo from '@/components/logo'

const Navigation = () => {
  return (
    <header className="py-3 md:py-4 w-full border-b border-border fixed bg-background z-10">
      <nav className="container flex items-center justify-between">
        <div className="flex">
          <Link
            href="/"
            className="text-4xl md:text-5xl w-36 md:w-44 text-black dark:text-white"
          >
            <Logo />
          </Link>
        </div>
        <div className="flex space-x-2 items-center">
          <ThemeToggle />
          <Favorites />
        </div>
      </nav>
    </header>
  )
}

export default Navigation
