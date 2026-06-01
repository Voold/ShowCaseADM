export const queryKeys = {
  all: ['projects'] as const,
  user: (userId: string) => [...queryKeys.all, 'user', userId] as const,
  search: (query: string, offset: number, limit: number) =>
    [...queryKeys.all, 'search', { query, limit, offset }] as const,
  userSearch: (userId: string, query: string, offset: number, limit: number) => [
    ...queryKeys.user(userId),
    'search',
    { query, limit, offset }
  ]
}
