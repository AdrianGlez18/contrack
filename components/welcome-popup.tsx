'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { PartyPopper } from 'lucide-react'

export function WelcomePopup({ isNewUser }: { isNewUser: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isNewUser) {
      setIsOpen(true)
    }
  }, [isNewUser])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PartyPopper className="h-5 w-5 text-yellow-500" />
            Welcome to Our App!
          </DialogTitle>
        </DialogHeader>
        <div className="text-center py-4">
          <p>Thank you for joining us! We're excited to have you on board.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

