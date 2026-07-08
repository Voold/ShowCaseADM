import { useState } from 'react'
import { useRemoveTag } from '../api/mutations'
import { CloseButton, ConfirmModal } from '@/shared'

interface RemoveTagButtonProps {
  tagId: string
}

export function RemoveTagButton({ tagId }: RemoveTagButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate: removeTag, isPending } = useRemoveTag()

  return (
    <>
      <CloseButton onClick={() => setIsModalOpen(true)} />
      <ConfirmModal
        isOpened={isModalOpen}
        isPending={isPending}
        onSubmit={() => removeTag(tagId, { onSettled: () => setIsModalOpen(false) })}
        onReject={() => setIsModalOpen(false)}
      />
    </>
  )
}
