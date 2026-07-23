import { useState } from 'react'
import styles from './CreateTagForm.module.css'
import { useCreateTag } from '../api/mutations'
import { TagGroupRow, useTagGroups, type TagGroup } from '@/entities/tag'
import { AgreeButton, Card, FloatingList, Input, TextSkeleton } from '@/shared'

export function CreateTagForm() {
  const { mutate: createTag, isPending } = useCreateTag()

  const { data: tagGroups = [], isLoading, isError } = useTagGroups()
  const [isListVisible, setIsListVisible] = useState(false)

  const [tagName, setTagName] = useState('')
  const [chosenGroup, setChosenGroup] = useState<{ id: string; name: string }>({ id: '', name: '' })

  const handleCreateTag = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    createTag(
      { name: tagName, groupId: chosenGroup.id },
      {
        onSuccess: () => {
          setTagName('')
          setChosenGroup({ id: '', name: '' })
        }
      }
    )
  }

  const handleChooseGroup = (group: Omit<TagGroup, 'tags'>) => {
    if (chosenGroup.id === group.id) {
      setChosenGroup({ id: '', name: '' })
    } else {
      setChosenGroup({ id: group.id, name: group.name })
    }
    setIsListVisible(false)
  }

  const renderGroupList = () => {
    if (isLoading) return Array.from({ length: 3 }, (_, i) => <TextSkeleton className={styles.groupSkeleton} key={i} />)
    if (isError) return <h6>Произошла ошибка :P</h6>
    if (!tagGroups.length) return <h6>Тут пусто</h6>
    return tagGroups.map(group => <TagGroupRow className={styles.groupRow} group={group} key={group.id} onClick={() => handleChooseGroup(group)} />)
  }

  return (
    <Card title='Добавление тега'>
      <form className={styles.form} onSubmit={handleCreateTag}>
        <div className={styles.fields}>
          <Input placeholder='Имя тега' value={tagName} onChange={e => setTagName(e.target.value)} onClear={() => setTagName('')} />
          {/* <input type='text' placeholder='Имя тега' value={tagName} onChange={e => setTagName(e.target.value)} /> */}
          <div className={`${styles.field} ${chosenGroup.id ? ' ' : styles.empty}`} onClick={() => setIsListVisible(p => !p)}>
            {chosenGroup.name || 'Выберите группу'}
          </div>
          {isListVisible && <FloatingList className={styles.list}>{renderGroupList()}</FloatingList>}
        </div>
        <AgreeButton className={styles.button} disabled={isPending || !tagName.trim() || !chosenGroup.id.trim()} isLoading={isPending}>
          Создать
        </AgreeButton>
      </form>
    </Card>
  )
}
