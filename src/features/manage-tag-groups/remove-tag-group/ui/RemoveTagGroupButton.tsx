import { useState } from "react"
import { useRemoveTagGroup } from "../api/mutations"
import { CloseButton, ConfirmModal } from "@/shared"

interface RemoveTagGroupButtonProps {
  groupId: string
}

export function RemoveTagGroupButton({ groupId }: RemoveTagGroupButtonProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)
		const { mutate: removeGroup } = useRemoveTagGroup()
	
		const handleRemoveGroup = () => {
			setIsModalOpen(false)
			removeGroup(groupId)
		}
	
		return (
			<>
				<CloseButton onClick={() => setIsModalOpen(true)} /> {/* вот тут бы спиннер на загрузку поставить */}
				<ConfirmModal isOpened={isModalOpen} onSubmit={handleRemoveGroup} onReject={() => setIsModalOpen(false)} />
			</>
		)
}
