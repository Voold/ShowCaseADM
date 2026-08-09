export const queryKeys = {
  all: ['projects'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (params: { query: string; offset: number; limit: number }) => [...queryKeys.lists(), params] as const,
  user: (userId: string) => [...queryKeys.all, 'user', userId] as const,
  userList: (userId: string, params: { query: string; offset: number; limit: number }) => [...queryKeys.user(userId), params] as const
}
