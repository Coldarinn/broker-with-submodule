import React from "react"
import CrossIcon from "@/assets/images/icons/cross.svg"
import styled from "@emotion/styled"

type Props = {
  onRequestClose: () => void
  className?: string
  children: React.ReactNode
}

export const CarouselModal: React.FC<Props> = ({
  onRequestClose,
  children,
  className,
}) => {
  return (
    <ContentContainer className={className}>
      {children}

      <Close onClick={onRequestClose}>
        <CrossIcon width={28} height={28} />
      </Close>
    </ContentContainer>
  )
}

const ContentContainer = styled.div`
  position: relative;
  padding: 48px;
  border-radius: 24px;
  background: rgba(20, 20, 20, 1);
  color: #fff;
`

const Close = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
  padding: 14px;
  border-radius: 0 24px 0 24px;
  background: rgba(5, 5, 5, 0.5);
`
