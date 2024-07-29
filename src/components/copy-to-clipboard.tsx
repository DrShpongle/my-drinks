import useClipboard from 'react-use-clipboard'
import { BiLink } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ShareLinkProps = {
  link: string
  message?: string
  className?: string
  svgClassName?: string
}

const CopyToClipboard: React.FC<
  React.PropsWithChildren<ShareLinkProps & { onSuccess: () => void }>
> = ({
  link,
  onSuccess,
  className = '',
  svgClassName = 'text-base',
  children,
  ...props
}) => {
  const [_, copyToClipboard] = useClipboard(link, {
    successDuration: 700,
  })

  return (
    <Button
      variant="secondary"
      onClick={() => {
        copyToClipboard()
        onSuccess()
      }}
      className={cn('relative text-xs', className)}
      {...props}
    >
      <BiLink className={svgClassName} />
      {children || <span className="sr-only">copy url to clipboard</span>}
    </Button>
  )
}

export default CopyToClipboard
