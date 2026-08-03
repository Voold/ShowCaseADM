import { useState } from 'react'
import styles from './EditProjectRoleButton.module.css'
import { useEditProjectRole } from '../api/mutations'
import type { ProjectRoleType } from '@/entities/project-role-type'
import { AgreeButton, Card, EditIcon, Input, Modal } from '@/shared'

interface EditProjectRoleButtonProps {
  roleType: ProjectRoleType
}

export function EditProjectRoleButton({ roleType }: EditProjectRoleButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [value, setValue] = useState(roleType.name)

  const { mutate: editProjectRole, isPending } = useEditProjectRole()

  const handleOpen = () => {
    setValue(roleType.name)
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    editProjectRole({ id: roleType.id, name: value }, { onSettled: () => setIsModalOpen(false) })
  }

  return (
    <>
      <EditIcon className={styles.button} onClick={handleOpen} />
      <Modal isOpened={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Card title='Изменение роли'>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input placeholder='Имя роли' value={value} onChange={e => setValue(e.target.value)} onClear={() => setValue('')} />
            <AgreeButton isLoading={isPending} disabled={!value.trim() || value === roleType.name}>
              Подтвердить
            </AgreeButton>
          </form>
        </Card>
      </Modal>
    </>
  )
}
