import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import Axios from '@/lib/axios'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { mutate } from 'swr'
import { useToast } from './ui/use-toast'

export function DeleteAlert({
  linkApi,
  id,
  isOpen,
  setIsOpen,
}: {
  linkApi: string
  id: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [remove, setRemove] = useState(false)
  const { toast } = useToast()
  if (remove) {
    try {
      Axios.delete(`${linkApi}/${id}`)
        .then(() => {
          mutate(linkApi)
          toast({ title: 'Success', description: 'Data has been deleted' })
        })
        .catch(error => {
          console.error(error)
        })
    } catch (error) {
      console.error(error)
    } finally {
      setRemove(false)
      setIsOpen(false)
    }
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={() => setRemove(true)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
