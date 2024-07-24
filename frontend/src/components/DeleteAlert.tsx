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

export function DeleteAlert({ id }: { id: string }) {
  const [remove, setRemove] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  if (remove) {
    try {
      Axios.delete(`/api/renthouses/${id}`)
        .then(() => {
          mutate('/api/renthouses')
          toast({ title: 'Success', description: 'Data has been deleted' })
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.error(error)
    } finally {
      setRemove(false)
      setOpen(false)
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="flex justify-center items-center">
        <Trash2 className="mr-2 h-4 w-4" />
        <span>Delete</span>
      </AlertDialogTrigger>
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
