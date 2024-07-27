import Link from 'next/link'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FolderHeart } from 'lucide-react'
import Favorites from '@/components/favorites'

const Navigation = () => {
  return (
    <header className="py-4 w-full border-b border-border fixed bg-background">
      <nav className="container flex items-center justify-between">
        <div>
          <Link href="/" className="text-5xl">
            🍹
          </Link>
        </div>
        <div>
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center">
                <FolderHeart />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Favorites />
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </header>
  )
}

export default Navigation
