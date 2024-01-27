import React from "react"
import { createPortal } from "react-dom"
import styled from "@emotion/styled"
import { isServer } from "@/modules/utils/isServer"

type Props = {
  isVisible: boolean
  onRequestClose: (value: false) => void
  className?: string
  children: React.ReactNode
}

let counterOpenModal = 0

const useModal = (
  isVisible: Props["isVisible"],
  onRequestClose: Props["onRequestClose"],
) => {
  const onRequestCloseRef = React.useRef(onRequestClose)
  onRequestCloseRef.current = onRequestClose

  React.useEffect(() => {
    const handlerKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onRequestCloseRef.current(false)
      }
    }
    document.addEventListener("keyup", handlerKeyDown)

    return () => document.removeEventListener("keyup", handlerKeyDown)
  }, [])

  React.useEffect(() => {
    if (isVisible) {
      counterOpenModal++
      document.body.style.overflow = "hidden"

      return () => {
        counterOpenModal--
        if (counterOpenModal === 0) {
          document.body.style.removeProperty("overflow")
        }
      }
    }
  }, [isVisible])

  return {
    onBackgroundClick: ({ target, currentTarget }: MouseEvent): void => {
      target === currentTarget && onRequestCloseRef.current(false)
    },
  }
}

export const Modal: React.FC<Props> = ({
  isVisible,
  onRequestClose,
  children,
  className,
}) => {
  const { onBackgroundClick } = useModal(isVisible, onRequestClose) as any

  if (isServer || !isVisible) {
    return null
  }

  return createPortal(
    <Container onClick={onBackgroundClick} className={className}>
      {children}
    </Container>,
    document.querySelector("#modalRoot") as HTMLElement,
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: auto;

  background: rgba(5, 5, 5, 0.5);
  backdrop-filter: blur(7.5px);
`
