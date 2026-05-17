import defaultAvatar from '../assets/user-avatar.svg'
import { ROLE_WEIGHTS, type User } from '../model/types'

export const placeholderUser: User = {
	id: 'loading...',
  email: `loading@example.com`,
  profilePicture: defaultAvatar,
  meta: {
    name: `Загрузка...`,
    bio: '',
    skills: '',
    experience: ''
  },
  roles: [{ type: 'Default', weight: ROLE_WEIGHTS.Default }],
  capabilities: []
}