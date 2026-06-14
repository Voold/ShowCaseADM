export type Toast = {
  id: string
  status: 'success' | 'error'
  title?: string
  description?: string
  link?: {
    title: string
    to: string
  }
}
