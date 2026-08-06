import type { ProjectStatus } from '../model/types'
import { assertNever } from '@/shared'

export const getStatusTranslation = (status: ProjectStatus) => {
  switch (status) {
    case 'active':
      return 'Активен'
    case 'approved':
      return 'Одобренный'
    case 'archived':
      return 'В архиве'
    case 'completed':
      return 'Выполненный'
    case 'pending':
      return 'В ожидании'
    case 'rejected':
      return 'Отклонённый'
    default:
      return assertNever(status)
  }
}
