import { useState } from 'react'
import DiagramIcon from '../../assets/diagram.svg?react'
import FolderIcon from '../../assets/folder.svg?react'
import GearIcon from '../../assets/gear.svg?react'
import HammerIcon from '../../assets/hammer.svg?react'
import LayoutIcon from '../../assets/layout.svg?react'
import UsersIcon from '../../assets/users.svg?react'
import styles from './SideBar.module.css'
import { NavButton } from '../NavButton/NavButton'
import { UserSlot } from '@/entities/user'
import { Logo } from '@/shared/ui'

const buttons = [
  { name: 'Главная', icon: LayoutIcon, to: '' },
  { name: 'Проекты', icon: FolderIcon, to: '' },
  { name: 'Пользователи', icon: UsersIcon, to: '' },
  { name: 'Модераторы', icon: HammerIcon, to: '' },
  { name: 'Отчёты', icon: DiagramIcon, to: '' },
  { name: 'Настройки', icon: GearIcon, to: '' }
]

export function SideBar() {
  const [activeButton, setActiveButton] = useState('Главная')

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
            isActive={activeButton === button.name}
            onClick={() => setActiveButton(button.name)}
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
