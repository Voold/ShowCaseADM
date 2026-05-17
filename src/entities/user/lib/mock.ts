import { ROLE_WEIGHTS, type User } from '../model/types'
import defaultAvatar from '../assets/user-avatar.svg'

export const mockedUsers: User[] = Array.from({ length: 24 }, (_, i) => ({
  id: (283160 + i).toString(),
  email: `user${i + 1}@example.com`,
  profilePicture: defaultAvatar,
  meta: {
    name: `Ярон ${i + 1}. Н.`,
    bio: 'bio',
    skills: 'skills',
    experience: 'experience'
  },
  roles:
    i % 3 === 0
      ? [
          { type: 'Admin', weight: ROLE_WEIGHTS.Admin },
          { type: 'Default', weight: ROLE_WEIGHTS.Default }
        ]
      : [{ type: 'Default', weight: ROLE_WEIGHTS.Default }],
  capabilities: []
}))
