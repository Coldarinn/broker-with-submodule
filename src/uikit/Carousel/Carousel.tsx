import styled from "@emotion/styled"
import SearchPlusIcon from "@/assets/images/icons/search-plus.svg"
import { css } from "@emotion/react"
import React from "react"

type Props = {
  images: string[]
  onClick?: () => void
  objectClass?: string
  className?: string
}

export const Carousel = ({
  images,
  onClick,
  objectClass,
  className,
}: Props) => {
  const [activeItemIndex, setActiveItemIndex] = React.useState(0)
  const [isImageHovered, setIsImageHovered] = React.useState(false)

  const onChangeActiveItem = (index: number) => () => {
    setActiveItemIndex(index)
  }

  const onMouseEnterImage = () => {
    setIsImageHovered(true)
  }

  const onMouseLeaveImage = () => {
    setIsImageHovered(false)
  }

  return (
    <Wrapper className={className}>
      {objectClass && <Class>{objectClass}</Class>}

      <Images activeItemIndex={activeItemIndex}>
        {images.map((image, key) => (
          <ImageWrapper key={key}>
            <Image src={image} alt="slider item" />
          </ImageWrapper>
        ))}
      </Images>

      <Controls>
        {images.map((_, index) => (
          <CircleControl
            key={index}
            active={index === activeItemIndex}
            onClick={onChangeActiveItem(index)}
            onMouseEnter={onChangeActiveItem(index)}
          />
        ))}
      </Controls>

      <Additional
        onMouseEnter={onMouseEnterImage}
        onMouseLeave={onMouseLeaveImage}
      >
        <ScrollByMouseMoving onClick={onClick}>
          {images.map((_, index) => (
            <ScrollByMouseMovingItem
              key={index}
              onMouseEnter={() => setActiveItemIndex(index)}
            />
          ))}
        </ScrollByMouseMoving>

        <DarkenBG isShow={isImageHovered}>
          <Icon width={55} height={55} />
        </DarkenBG>
      </Additional>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 322px;
  height: 230px;
  border-radius: 14px;
  overflow: hidden;
`
const Class = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 4px 8px 4px 8px;
  border-radius: 4px;
  background: rgba(50, 50, 50, 0.7);

  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 1);
  z-index: 3;
`
const Images = styled.div<{ activeItemIndex: number }>`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  transition: transform 0.3s ease-in-out;

  ${({ activeItemIndex }) => css`
    transform: translateX(calc(-${activeItemIndex} * 100%));
  `}
`
const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);

  height: 22px;
  border-radius: 90px;
  padding: 8px;
  background: rgba(5, 5, 5, 0.65);
  z-index: 3;
`
const CircleControl = styled.div<{ active?: boolean }>`
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 1);
  opacity: 0.4;
  transition: opacity 0.2s;
  border-radius: 50%;

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
    `}
`
const Additional = styled.div``

const ScrollByMouseMoving = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 2;
`
const ScrollByMouseMovingItem = styled.div`
  width: 100%;
  height: 100%;
  z-index: 3;
`
const DarkenBG = styled.div<{ isShow: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(5, 5, 5, 0.5);
  opacity: 0;
  transition: opacity 0.2s;

  ${({ isShow }) =>
    isShow &&
    css`
      opacity: 1;

      svg {
        opacity: 1;
      }
    `}
`
const Icon = styled(SearchPlusIcon)`
  opacity: 0;
  color: transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s;
  z-index: 1;
`
