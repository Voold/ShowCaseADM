import { useState } from 'react'
import styles from './EditTagButton.module.css'
import { useEditTag } from '../api/mutations'
import { TagGroupRow, useTagGroups, type Tag, type TagGroup } from '@/entities/tag'
import { AgreeButton, Card, EditIcon, FloatingList, Modal, TextSkeleton } from '@/shared'

interface EditTagButtonProps {
  tag: Tag
  group: Omit<TagGroup, 'tags'>
}

export function EditTagButton({ tag, group }: EditTagButtonProps) {
  const [isModalOpen, setIsModalOpened] = useState(false)

  const { data: tagGroups = [], isLoading, isError } = useTagGroups()
  const [isListVisible, setIsListVisible] = useState(false)

  const [tagName, setTagName] = useState(tag.name)
  const [chosenGroup, setChosenGroup] = useState<Omit<TagGroup, 'tags'>>(group)

  const { mutate: editTag, isPending } = useEditTag()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    editTag(
      { id: tag.id, name: tagName, groupId: chosenGroup.id },
      {
        onSettled: () => {
          setIsModalOpened(false)
          setTagName(tag.name)
          setChosenGroup(group)
        }
      }
    )
  }

  const handleChooseGroup = (group: Omit<TagGroup, 'tags'>) => {
    setChosenGroup(group)
    setIsListVisible(false)
  }

  const renderGroupList = () => {
    if (isLoading) return Array.from({ length: 3 }, (_, i) => <TextSkeleton className={styles.groupSkeleton} key={i} />)
    if (isError) return <h6>Произошла ошибка :P</h6>
    if (!tagGroups.length) return <h6>Тут пусто</h6>
    return tagGroups.map(group => <TagGroupRow className={styles.groupRow} group={group} key={group.id} onClick={() => handleChooseGroup(group)} />)
  }

  return (
    <>
      <EditIcon className={styles.button} onClick={() => setIsModalOpened(true)} />
      <Modal isOpened={isModalOpen} onClose={() => setIsModalOpened(false)}>
        <Card title='Изменение тега'>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fields}>
              <input type='text' placeholder='Имя тега' value={tagName} onChange={e => setTagName(e.target.value)} />
              <div className={`${styles.field} ${chosenGroup.id ? ' ' : styles.empty}`} onClick={() => setIsListVisible(p => !p)}>
                {chosenGroup.name || 'Выберите группу'}
              </div>
              {isListVisible && <FloatingList className={styles.list}>{renderGroupList()}</FloatingList>}
            </div>
            <AgreeButton className={styles.confirmButton} disabled={isPending || !tagName.trim() || !chosenGroup.id.trim()} isLoading={isPending}>
              Подтвердить
            </AgreeButton>
          </form>
        </Card>
      </Modal>
    </>
  )
}
