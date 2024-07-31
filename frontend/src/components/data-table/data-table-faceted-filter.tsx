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
import { ErrorMessage, Field, useFormikContext } from 'formik'

interface Values {
  id: string
  name: string
}

function getData(field: string): Values[] {
  const { data: dataApi } = useSWR(`/api/${field}`, () =>
    Axios.get(`/api/${field}`)
      .then(res => res.data.data)
      .catch(error => {
        if (error.response.status !== 409) throw error
      }),
  )
  const dataArray: Values[] =
    dataApi?.map((item: Values) => ({
      id: `${item.id}`,
      name: item.name,
    })) || []
  return dataArray
}

export function ComboboxDemo({
  name,
  apiUrl,
  title,
}: {
  name : string
  apiUrl: string
  title: string
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const dataList = getData(apiUrl)
  const { setFieldValue } = useFormikContext()
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between">
              {value
                ? dataList.find(framework => framework.id === value)?.name
                : `Select ${title}...`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
            <ErrorMessage
              name={name}  
              component="span"
              className="text-xs text-red-500"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${title} ...`} />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {dataList.map(framework => (
                  <CommandItem
                    key={framework.id}
                    value={framework.id}
                    onSelect={currentValue => {
                      setValue(currentValue)
                      setOpen(false)
                      setFieldValue(name, currentValue)
                    }}>
                    <option value={framework.id}></option>
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
        </PopoverContent>
      </Popover>
    </>
  )
}
