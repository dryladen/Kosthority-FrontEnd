'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import useSWR from 'swr'
import Axios from '@/lib/axios'
import { ErrorMessage, Field } from 'formik'

interface Renthouse {
  id: string
  name: string
}

function getData(): Renthouse[] {
  const { data: renthouses } = useSWR('/api/renthouses', () =>
    Axios.get('/api/renthouses')
      .then(res => res.data.data)
      .catch(error => {
        if (error.response.status !== 409) throw error
      }),
  )
  const roomsData: Renthouse[] =
    renthouses?.map((item: Renthouse) => ({
      id: `${item.id}`,
      name: item.name,
    })) || []
  return roomsData
}

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const renthouses = getData()
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between">
            {value
              ? renthouses.find(framework => framework.id === value)?.name
              : 'Select renthouse...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
          <ErrorMessage
            name="rent_house_id"
            component="span"
            className="text-xs text-red-500"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search rental house..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {renthouses.map(framework => (
                <CommandItem
                  key={framework.id}
                  value={framework.id}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {framework.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <Field
          id="rent_house_id"
          name="rent_house_id"
          type="radio"
          value={value}
          placeholder="Ex: Angle House"
          className="hidden p-2 mt-1 w-full text-sm rounded-md shadow-sm border-gray-300 focus:border-slate-200 outline-none focus:ring-2 focus:ring-slate-200 "
        />
      </PopoverContent>
    </Popover>
  )
}
