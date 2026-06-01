export const queryKeys = {
  all: ['projects'] as const,
  search: (query: string, offset: number, limit: number) => [...queryKeys.all, 'search', {query, limit, offset}] as const,
  user: (userId: string) => [...queryKeys.all, 'user', userId] as const
};