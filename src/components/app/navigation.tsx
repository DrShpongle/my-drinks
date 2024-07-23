import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ShoppingCart } from 'lucide-react'

const Navigation = () => {
  return (
    <header className="py-4 w-full">
      <nav className="max-w-screen-lg px-4 mx-auto flex items-center justify-between">
        <div>links</div>
        <div>
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center space-x-3">
                <ShoppingCart />
                <span>Cart</span>
              </div>
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
        </div>
      </nav>
    </header>
  )
}

export default Navigation
