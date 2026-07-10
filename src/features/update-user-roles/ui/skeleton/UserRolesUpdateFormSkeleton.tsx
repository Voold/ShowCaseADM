import s1 from '../UserRolesUpdateForm.module.css'
import s2 from './UserRolesUpdateFormSkeleton.module.css'
import { TextSkeleton } from '@/shared'

export function UserRolesUpdateFormSkeleton() {
  return (
    <aside className={s1.container}>
      <p className={s1.title}>Роли пользователя</p>
      <ul className={s1.list}>
        {Array.from({ length: 8 }, (_, i) => (
          <div className={s2.role} key={i}>
            <TextSkeleton className={s2.text}/>
            <TextSkeleton className={s2.text}/>
          </div>
        ))}
      </ul>
    </aside>
  )
}
