import { type RefObject, useEffect, useRef } from 'react'

export const useClickOutside = (ref: RefObject<HTMLElement | null>, handler: (event: MouseEvent | TouchEvent) => void) => {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target
      if (ref.current && !ref.current.contains(target as Node)) {
        handlerRef.current(event)
      }
    }
    document.addEventListener('mousedown', listener)
		document.addEventListener('touchstart', listener)
    return () => {
			document.removeEventListener('mousedown', listener)
			document.removeEventListener('touchstart', listener)
		}
  }, [ref])
}
