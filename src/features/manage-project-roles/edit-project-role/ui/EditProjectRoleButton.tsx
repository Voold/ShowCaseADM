import { useState } from 'react'
import styles from './EditProjectRoleButton.module.css'
import { useEditProjectRole } from '../api/mutations'
import type { ProjectRoleType } from '@/entities/project-role-type'
import { AgreeButton, Card, EditIcon, Modal } from '@/shared'

interface EditProjectRoleButtonProps {
  roleType: ProjectRoleType
}

export function EditProjectRoleButton({ roleType }: EditProjectRoleButtonProps) {
  const [isModalOpen, setIsModalOpened] = useState(false)
  const [value, setValue] = useState(roleType.name)

  const { mutate: editProjectRole, isPending } = useEditProjectRole()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    editProjectRole(
      { id: roleType.id, name: value },
      {
        onSettled: () => {
          setIsModalOpened(false)
          setValue(roleType.name)
        }
      }
    )
  }

  return (
    <>
      <EditIcon
        className={styles.button}
        onClick={() => {
          setIsModalOpened(true)
        }}
      />
      <Modal isOpened={isModalOpen} onClose={() => setIsModalOpened(false)}>
        <Card title='Изменение роли'>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input placeholder='Имя роли' value={value} onChange={e => setValue(e.target.value)} />
            <AgreeButton isLoading={isPending} disabled={!value.trim()}>
              Подтвердить
            </AgreeButton>
          </form>
        </Card>
      </Modal>
    </>
  )
}
