import type React from "react";
import { useMemo } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
	children: React.ReactNode
}

export function Portal({children}: PortalProps) {
	const modalRootElement = useMemo(() => document.getElementById('modal-root'), [])
  if (!modalRootElement) {
    console.error('#modal-root not found')
    return null
  }
  return createPortal(children, modalRootElement)
}