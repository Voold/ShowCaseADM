import { useParams } from 'react-router-dom'
import styles from './UserPage.module.css'
import { UserProjectsList } from '@/widgets/user-projects-list'
import { IssuingARole } from '@/features/issuing-a-role'
import { useUserById, UserSlot } from '@/entities/user'

export const UserPage = () => {
  const { id } = useParams()
  const { data, isLoading, error } = useUserById(id)

  if (isLoading) return <h1>Загрузка</h1>
  if (error || !data || !id) return <h1>Ошибка</h1>

  return (
    <main className={styles.mainContainer}>
      <h2>Страница пользователя</h2>
      <div className={styles.firstContainer}>
        <div className={styles.mainInfo}>
          <div className={styles.userSlot}>{data && <UserSlot user={data} />}</div>
          <IssuingARole userRoles={data?.roles} />
        </div>
        <div className={styles.container}>
          <div className={styles.secondInfo}>
            <p className={styles.info}>Почта:</p>
            {data?.email}
            <p className={styles.info}>Биография:</p>
            {data?.meta.bio ? data?.meta.bio : 'Нет'}
            <p className={styles.info}>Скиллы:</p>
            {data?.meta.skills ? data?.meta.skills : 'Нет'}
            <p className={styles.info}>Опыт:</p>
            {data?.meta.experience ? data?.meta.experience : 'Нет'}
          </div>
          <p className={styles.title}>Проекты пользователя</p>
          <UserProjectsList userId={id} />
        </div>
      </div>
    </main>
  )
}
