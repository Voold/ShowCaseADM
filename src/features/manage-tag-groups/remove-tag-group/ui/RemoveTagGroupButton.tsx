import { useState } from 'react'
import { useRemoveTagGroup } from '../api/mutations'
import { CloseButton, ConfirmModal } from '@/shared'

interface RemoveTagGroupButtonProps {
  groupId: string
}

export function RemoveTagGroupButton({ groupId }: RemoveTagGroupButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate: removeGroup, isPending } = useRemoveTagGroup()

  return (
    <>
      <CloseButton onClick={() => setIsModalOpen(true)} />
      <ConfirmModal
        isOpened={isModalOpen}
				isPending={isPending}
        onSubmit={() => removeGroup(groupId, { onSettled: () => setIsModalOpen(false) })}
        onReject={() => setIsModalOpen(false)}
      />
    </>
  )
}
