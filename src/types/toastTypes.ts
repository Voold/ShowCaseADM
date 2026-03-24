export interface ToastProps {
  status?: boolean,
  title?: string,
  description?: string,
  link?: {
    title_link: string,
    link: string},
  onClose?: () => void
}