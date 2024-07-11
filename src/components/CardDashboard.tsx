import { DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type props = {
  title: string
  logo: ReactNode
  content: string
  desc?: string
  classname?: string
}

const CardDashboard = ({
  title,
  logo,
  content,
  desc,
  classname,
  ...props
}: props) => {
  return (
    <Card className={cn('shadow-lg w-full', classname)}>
      <CardHeader className="flex flex-row gap-2 items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {logo}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content}</div>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  )
}

export default CardDashboard
