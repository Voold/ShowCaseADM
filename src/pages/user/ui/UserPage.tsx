import { useParams } from 'react-router-dom'
import styles from './UserPage.module.css'
import { useUserById } from '@/entities/user/api/queries'
import { UserSlot } from '@/entities/user'
import { IssuingARole } from '@/features/issuing-a-role/ui/IssuingARole'
import { ProjectsList } from '@/widgets/projects-list'

export const UserPage = () => {

  const query = useParams()
  const uid = query.id || ''

  const { data, isLoading, error } = useUserById(uid) 

  console.log('UserPage', { data, isLoading, error })


  return (
    <main className={styles.mainContainer}>
      <h2>Страница пользователя</h2>
      <div className={styles.firstContainer}>
        <div className={styles.mainInfo}>
          <div className={styles.userSlot}>
            {data && <UserSlot user={data} />}
          </div>
          <IssuingARole 
            userRoles={data?.roles}
          />
        </div>
        <div className={styles.container}>
          <div className={styles.secondInfo}>
            <p className={styles.info}>Почта:</p>
            {data?.email}
            <p className={styles.info}>Биография:</p>
            {data?.meta.bio ? data?.meta.bio : 'Нет'}
            <p className={styles.info}>Скины:</p>
            {data?.meta.skills ? data?.meta.skills : 'Нет'}
            <p className={styles.info}>Опыт:</p>
            {data?.meta.experience ? data?.meta.experience :'Нет'}
          </div>
          <p className={styles.title}>Проекты пользователя</p>
          <ProjectsList />
        </div>
      </div>
    </main>
  )
}