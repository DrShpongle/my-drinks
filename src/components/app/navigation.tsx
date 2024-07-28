import Link from 'next/link'

import Favorites from '@/components/favorites'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const Navigation = () => {
  return (
    <header className="py-3 md:py-4 w-full border-b border-border fixed bg-background z-10">
      <nav className="container flex items-center justify-between">
        <div>
          <Link href="/" className="text-4xl md:text-5xl">
            🍹
          </Link>
        </div>
        <div>
          <Favorites />
        </div>
      </nav>
    </header>
  )
}

export default Navigation
