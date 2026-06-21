import styles from './PartnerSlot.module.css'
import type { ComponentPropsWithoutRef } from 'react'
import type { Partner } from '../model/types'

interface PartnerSlotProps extends ComponentPropsWithoutRef<'div'> {
  partner: Partner
}

export function PartnerSlot({ partner, className, children, onClick, ...props }: PartnerSlotProps) {
  return (
    <div className={`${styles.container} ${onClick && styles.clickable} ${className}`} onClick={onClick} {...props}>
      <div className={styles.mainInfo}>
        <img className={styles.avatar} src={partner.avatarUrl} alt='Фото партнёра' />
        <p title={partner.name} className={styles.name}>
          {partner.name}
        </p>
      </div>
      {children}
    </div>
  )
}
