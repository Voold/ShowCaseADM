import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import DiagramIcon from '../../assets/diagram.svg?react'
import FolderIcon from '../../assets/folder.svg?react'
import GearIcon from '../../assets/gear.svg?react'
import HammerIcon from '../../assets/hammer.svg?react'
import LayoutIcon from '../../assets/layout.svg?react'
import UsersIcon from '../../assets/users.svg?react'
import styles from './SideBar.module.css'
import { NavButton } from '../NavButton/NavButton'
import { UserSlot } from '@/entities/user'
import { Logo, ROUTES } from '@/shared'

const buttons = [
  { name: 'Главная', icon: LayoutIcon, to: '/' },
  { name: 'Проекты', icon: FolderIcon, to: ROUTES.PROJECTS },
  { name: 'Пользователи', icon: UsersIcon, to: ROUTES.USERS },
  { name: 'Роли', icon: HammerIcon, to: ROUTES.ROLES },
  { name: 'Отчёты', icon: DiagramIcon, to: ROUTES.REPORTS },
  { name: 'Настройки', icon: GearIcon, to: ROUTES.SETTINGS }
]

export function SideBar() {
  const location = useLocation()
  const [activeButton, setActiveButton] = useState(location.pathname)

  return (
    <div className={styles.sideBar}>
      <Logo />
      <span className={styles.divider} />
      <nav className={styles.buttonList}>
        {buttons.map(button => (
          <NavButton
            to={button.to}
            key={button.name}
            Icon={button.icon}
            isActive={activeButton === button.to}
            onClick={() => setActiveButton(button.to)}
          >
            {button.name}
          </NavButton>
        ))}
      </nav>
      <span className={styles.divider} />
      <UserSlot />
    </div>
  )
}
