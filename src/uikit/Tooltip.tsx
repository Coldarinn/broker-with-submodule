import React from "react"
import { usePopper } from "react-popper"
import { Placement } from "@popperjs/core"
import { composeRefs } from "@/modules/utils/composeRefs"
import { useClickOutside } from "@/modules/utils/useClickOutside"
import styled from "@emotion/styled"

type Props = {
  content: React.ReactNode
  children: (isOpen: boolean) => React.ReactNode
  placement?: Placement
  offset?: [number, number]
  className?: string
  contentClassName?: "popper-content"
  activeMode?: "click" | "hover"
  withArrow?: boolean
}

export const Tooltip: React.FC<Props> = ({
  content,
  children,
  placement = "bottom",
  offset = [10, 10],
  className,
  activeMode = "hover",
  withArrow,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const [referenceElement, setReferenceElement] =
    React.useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = React.useState<HTMLElement | null>(
    null,
  )
  const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(
    null,
  )

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy: "fixed",
    modifiers: [
      {
        name: "offset",
        options: {
          offset,
        },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: ["top", "bottom", "right", "left", "auto"],
        },
      },
      { name: "arrow", options: { element: arrowElement, padding: 10 } },
    ],
  })

  const clickOutsideRef = useClickOutside(() => {
    if (activeMode === "click" && isOpen) {
      setIsOpen(false)
    }
  })

  const handleMouseEnter = () => {
    if (activeMode === "hover") {
      setIsOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (activeMode === "hover") {
      setIsOpen(false)
    }
  }

  const handleClick = (e: Event) => {
    e.stopPropagation()
    if (activeMode === "click") {
      setIsOpen(!isOpen)
    }
  }

  return (
    <Container
      ref={composeRefs([setReferenceElement, clickOutsideRef] as any)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick as any}
      className={`popper-wrapper ${className}`}
      {...attributes.popper}
    >
      {children(isOpen)}
      <Content
        ref={setPopperElement}
        className="popper-content"
        isOpen={isOpen}
        onClick={(e) => e.stopPropagation()}
        style={{
          ...styles.popper,
          minWidth: referenceElement?.offsetWidth || "auto",
        }}
      >
        {content}
        {withArrow && (
          <Arrow
            ref={setArrowElement}
            className="popper-arrow"
            style={{
              ...styles.arrow,
              transform: styles.arrow.transform + " rotate(45deg)",
            }}
            {...attributes.arrow}
          />
        )}
      </Content>
    </Container>
  )
}

const Container = styled.div`
  position: relative;

  &[data-popper-placement^="top"] > .popper-content > .popper-arrow {
    bottom: -4px;
  }

  &[data-popper-placement^="bottom"] > .popper-content > .popper-arrow {
    top: -4px;
  }

  &[data-popper-placement^="left"] > .popper-content > .popper-arrow {
    right: -4px;
  }

  &[data-popper-placement^="right"] > .popper-content > .popper-arrow {
    left: -4px;
  }

  &.storybook {
    & > .popper-content {
      opacity: 1;
      visibility: visible;
    }
  }
`

const Content = styled.div<{ isOpen: boolean }>`
  padding: 12px;
  border-radius: 12px;
  background: #414141;

  color: #fff;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.28px;

  transition:
    opacity 0.2s,
    visibility 0.2s;

  ${({ isOpen }) =>
    isOpen ?
      `
        opacity: 1;
        visibility: visible;
      `
    : `
        opacity: 0;
        visibility: hidden;
      `}
`

const Arrow = styled.div`
  width: 9px;
  height: 9px;

  background: #414141;
`
