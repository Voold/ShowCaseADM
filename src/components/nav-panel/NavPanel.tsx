import { useState } from 'react'
import DiagramIcon from '../../assets/diagram.svg?react'
import FolderIcon from '../../assets/folder.svg?react'
import GearIcon from '../../assets/gear.svg?react'
import HammerIcon from '../../assets/hammer.svg?react'
import LayoutIcon from '../../assets/layout.svg?react'
import UsersIcon from '../../assets/users.svg?react'
import Logo from '../ui/logo/Logo'
import NavButton from '../ui/nav-button/NavButton'
import UserSlot from '../user-slot/UserSlot'
import styles from './NavPanel.module.css'

function NavPanel() {
  const [activeButton, setActiveButton] = useState('Главная')

  const buttons = [
    { name: 'Главная', icon: LayoutIcon },
    { name: 'Проекты', icon: FolderIcon },
    { name: 'Пользователи', icon: UsersIcon },
    { name: 'Модераторы', icon: HammerIcon },
    { name: 'Отчёты', icon: DiagramIcon },
    { name: 'Настройки', icon: GearIcon }
  ]

  return (
    <div className={styles.navPanel}>
      <Logo />
      <span className={styles.divider} />
      <nav className={styles.buttonList}>
        {buttons.map(button => (
          <NavButton
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
      <UserSlot/>
    </div>
  )
}

export default NavPanel
