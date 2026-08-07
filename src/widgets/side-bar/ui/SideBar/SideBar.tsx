import DiagramIcon from '../../assets/diagram.svg?react'
import FolderIcon from '../../assets/folder.svg?react'
import GearIcon from '../../assets/gear.svg?react'
import HammerIcon from '../../assets/hammer.svg?react'
import LayoutIcon from '../../assets/layout.svg?react'
import UsersIcon from '../../assets/users.svg?react'
import styles from './SideBar.module.css'
import { NavButton } from '../NavButton/NavButton'
import { UserSlot, useMe, useAuthStore, UserSlotSkeleton } from '@/entities/user'
import { Logo, ROUTES } from '@/shared'

const buttons = [
  { name: 'Главная', icon: LayoutIcon, to: ROUTES.MAIN },
  { name: 'Проекты', icon: FolderIcon, to: ROUTES.PROJECTS },
  { name: 'Пользователи', icon: UsersIcon, to: ROUTES.USERS },
  { name: 'Роли', icon: HammerIcon, to: ROUTES.ROLES },
  { name: 'Отчёты', icon: DiagramIcon, to: ROUTES.REPORTS },
  { name: 'Настройки', icon: GearIcon, to: ROUTES.SETTINGS.BASE }
]

export function SideBar() {
  const status = useAuthStore(s => s.status)
  const { data: user } = useMe(status === 'authenticated')

  return (
    <div className={styles.sideBar}>
      <Logo />
      <span className={styles.divider} />
      <nav className={styles.buttonList}>
        {buttons.map(button => (
          <NavButton to={button.to} key={button.name} Icon={button.icon}>
            {button.name}
          </NavButton>
        ))}
      </nav>
      <span className={styles.divider} />
      {user ? <UserSlot user={user}/> : <UserSlotSkeleton />}
    </div>
  )
}
