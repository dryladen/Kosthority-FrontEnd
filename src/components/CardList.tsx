import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type dataCard = {
  title: string
  logo: LucideIcon
  sum: string
  desc?: string
  classname?: string
}
interface props {
  summary: {
    title: string
    logo: LucideIcon
    sum: string
    desc?: string
    classname?: string
  }[]
}

const CardList = ({ summary }: props) => {
  return (
    <>
      {summary.map((data: dataCard, index: number) => (
        <Card key={index} className={cn('shadow-lg w-full')}>
          <CardHeader className="flex flex-row gap-2 items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {data.title}
            </CardTitle>
            {<data.logo className="w-4 h-4 text-muted-foreground" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.sum}</div>
            <p className="text-xs text-muted-foreground">{data.desc}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default CardList
