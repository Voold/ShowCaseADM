import { useState } from 'react'
import { useRemoveTag } from '../api/mutations'
import { CloseButton, ConfirmModal } from '@/shared'

interface RemoveProjectRoleButtonProps {
  roleId: string
}

export function RemoveProjectRoleButton({ roleId }: RemoveProjectRoleButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate: removeTag, isPending } = useRemoveTag()

  return (
    <>
      <CloseButton onClick={() => setIsModalOpen(true)} />
      <ConfirmModal
        isPending={isPending}
        isOpened={isModalOpen}
        onSubmit={() => removeTag(roleId, { onSettled: () => setIsModalOpen(false) })}
        onReject={() => setIsModalOpen(false)}
      />
    </>
  )
}
