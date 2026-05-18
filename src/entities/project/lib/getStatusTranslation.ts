import type { ProjectStatus } from '../model/types'
import { assertNever } from '@/shared'

export const getStatusTranslation = (status: ProjectStatus) => {
  switch (status) {
    case 'active':
      return 'Активен'
    case 'pending':
      return 'В ожидании'
    case 'closed':
      return 'Закрыт'
    case 'archive':
      return 'Архив'
    default:
      return assertNever(status)
  }
}
