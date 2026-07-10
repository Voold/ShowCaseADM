import s1 from '../UserSlot.module.css'
import s2 from './UserSlotSkeleton.module.css'

import { ImageSkeleton, TextSkeleton } from '@/shared'

interface UserSlotSkeletonProps {
  isClickable?: boolean
  className?: string
}

export function UserSlotSkeleton({ isClickable = false, className }: UserSlotSkeletonProps) {
  return (
    <div className={`${s1.container} ${isClickable ? s1.clickable : ''} ${className ?? ''}`}>
      <div className={s1.mainInfo}>
        <ImageSkeleton className={s1.avatar} />
        <div className={s2.textContainer}>
					<TextSkeleton rows={2} />
        </div>
      </div>
    </div>
  )
}
