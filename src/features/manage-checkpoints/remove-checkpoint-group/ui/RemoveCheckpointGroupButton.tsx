import { useState } from 'react'
import { useRemoveCheckpointGroup } from '../api/mutations'
import { CloseButton, ConfirmModal } from '@/shared'

interface RemoveCheckpointGroupButtonProps {
  groupId: string
}

export function RemoveCheckpointGroupButton({ groupId }: RemoveCheckpointGroupButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate: removeGroup, isPending } = useRemoveCheckpointGroup()

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
