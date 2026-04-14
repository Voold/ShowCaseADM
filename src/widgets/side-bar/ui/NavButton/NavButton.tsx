import styles from './NavButton.module.css'
import { NavLink, type LinkProps } from 'react-router-dom'

interface NavButtonProps extends LinkProps {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>
  className?: string
  isActive?: boolean
}

export function NavButton({ Icon, className, isActive = false, children, ...props }: NavButtonProps) {
  return (
    // <NavLink className={({isActive}) => `${styles.button} ${isActive && styles.active} ${className}`} {...props}>
    <NavLink className={`${styles.button} ${isActive && styles.active} ${className}`} {...props}>
      {Icon && <Icon className={styles.icon} />}
      {children}
    </NavLink>
  )
}