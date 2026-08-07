import type { ProjectType } from '../model/types'
import { assertNever } from '@/shared'

export const getTypeTranslation = (type: ProjectType) => {
  switch (type) {
    case 'Case':
      return 'Кейсовый'
    case 'Real':
      return 'Реальный'
    case 'Study':
      return 'Учебный'
    default:
      assertNever(type)
  }
}
