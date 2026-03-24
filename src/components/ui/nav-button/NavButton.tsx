import type { ComponentPropsWithoutRef } from 'react'
import styles from './NavButton.module.css'

interface NavButtonProps extends ComponentPropsWithoutRef<'button'> {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>
  className?: string
  isActive?: boolean
}

function NavButton({ Icon, className, isActive = false, children, ...props }: NavButtonProps) {
  return (
    <button type="button" className={`${styles.button} ${isActive && styles.active} ${className}`} {...props}>
      {Icon && <Icon className={styles.icon} />}
      {children}
    </button>
  )
}

export default NavButton
