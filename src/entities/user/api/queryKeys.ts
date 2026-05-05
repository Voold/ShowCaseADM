export const queryKeys = {
  all: ['users'] as const,
  me: () => [...queryKeys.all, 'auth', 'me'] as const,
  user: (id: string) => [...queryKeys.all, 'user', id] as const,
  search: (query: string, offset: number, limit: number) => [...queryKeys.all, 'search', {query, limit, offset}] as const,
};