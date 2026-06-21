import { useState } from 'react'
import { useRemoveTag } from '../api/mutations'
import { CloseButton, ConfirmModal } from '@/shared'

interface RemoveProjectRoleButtonProps {
	roleId: string
}

export function RemoveProjectRoleButton({ roleId }: RemoveProjectRoleButtonProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { mutate: removeTag } = useRemoveTag()

	const handleRemoveTag = () => {
		setIsModalOpen(false)
		removeTag(roleId)
	}

	return (
		<>
			<CloseButton onClick={() => setIsModalOpen(true)} />
			<ConfirmModal isOpened={isModalOpen} onSubmit={handleRemoveTag} onReject={() => setIsModalOpen(false)} />
		</>
	)
}
