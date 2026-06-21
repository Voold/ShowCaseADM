import { ROUTES, VerticalTabs, type TabProps } from '@/shared'

const tabs: TabProps[] = [
  { name: 'Теги', to: ROUTES.SETTINGS.TAGS },
  { name: 'Роли', to: ROUTES.SETTINGS.PROJECT_ROLES },
  // { name: 'Партнёры', to: ROUTES.SETTINGS.PARTNERS },
  // { name: 'Чекпоинты', to: ROUTES.SETTINGS.CHECKPOINTS }
]

export function SettingsTabs() {
  return <VerticalTabs items={tabs} />
}
