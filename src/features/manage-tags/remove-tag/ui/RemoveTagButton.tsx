import { useState } from 'react'
import { useRemoveTag } from '../api/mutations'
import { CloseButton, ConfirmModal } from '@/shared'

interface RemoveTagButtonProps {
  tagId: string
}

export function RemoveTagButton({ tagId }: RemoveTagButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate: removeTag } = useRemoveTag()

  const handleRemoveTag = () => {
    setIsModalOpen(false)
    removeTag(tagId)
  }

  return (
    <>
      <CloseButton onClick={() => setIsModalOpen(true)} /> {/* вот тут бы спиннер на загрузку поставить */}
      <ConfirmModal isOpened={isModalOpen} onSubmit={handleRemoveTag} onReject={() => setIsModalOpen(false)} />
    </>
  )
}
