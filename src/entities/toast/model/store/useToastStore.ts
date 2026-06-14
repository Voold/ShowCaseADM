import { create } from 'zustand'
import type { Toast } from '../types'

interface ToastState {
  toasts: Toast[]
  show: (toastData: Omit<Toast, 'id'>) => void
  hide: (id: string) => void
}

export const useToastsStore = create<ToastState>(set => ({
  toasts: [],
  show: data =>
    set(state => ({
      toasts: [...state.toasts, { id: crypto.randomUUID(), ...data }]
    })),
  hide: id =>
    set(state => ({
      toasts: state.toasts.filter(t => t.id !== id)
    }))
}))
	