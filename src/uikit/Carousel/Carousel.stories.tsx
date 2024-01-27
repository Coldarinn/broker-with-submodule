import { Meta } from "@storybook/react"
import styled from "@emotion/styled"
import { Carousel } from "./Carousel.tsx"
import { CarouselModal } from "@/shared-components/CarouselModal"
import React from "react"
import { Modal } from "@/shared-components/Modal"

export default {
  title: "Components/Carousel",
  component: Carousel,
} as Meta

const images = [
  "https://akket.com/wp-content/uploads/2019/02/Google-Chrome-5.jpg",
  "https://azbyka.ru/wp-content/uploads/2016/07/priroda.jpg",
  "https://akket.com/wp-content/uploads/2019/02/Google-Chrome-5.jpg",
  "https://azbyka.ru/wp-content/uploads/2016/07/priroda.jpg",
]

export const Base = () => {
  const [isVisible, setIsVisible] = React.useState(false)

  const showModal = () => {
    setIsVisible(true)
  }

  const closeModal = () => {
    setIsVisible(false)
  }

  return (
    <Wrapper>
      <Flex>
        <SubTitle>Default:</SubTitle>

        <Carousel images={images} onClick={showModal} />

        <Modal isVisible={isVisible} onRequestClose={closeModal}>
          <CarouselModal onRequestClose={closeModal}>Test</CarouselModal>
        </Modal>
      </Flex>

      <Flex>
        <SubTitle>With object class:</SubTitle>

        <Carousel images={images} objectClass="БИЗНЕС" />
      </Flex>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-gap: 24px;
  width: fit-content;
  margin: 20px auto;
  padding: 20px 40px;
  border: 1px solid #9747ff80;
  border-radius: 8px;
  border-style: dashed;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  column-gap: 24px;
`

const SubTitle = styled.span`
  width: 120px;
  color: #fff;
`
