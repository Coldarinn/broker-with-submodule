import { Meta } from "@storybook/react"
import styled from "@emotion/styled"
import { Card } from "@/shared-components/Card"

export default {
  title: "Components/Card",
  component: Card,
} as Meta

const mockData = {
  images: [
    "https://akket.com/wp-content/uploads/2019/02/Google-Chrome-5.jpg",
    "https://azbyka.ru/wp-content/uploads/2016/07/priroda.jpg",
    "https://akket.com/wp-content/uploads/2019/02/Google-Chrome-5.jpg",
    "https://azbyka.ru/wp-content/uploads/2016/07/priroda.jpg",
  ],
  title: "1-комнатная квартира №243",
  location: {
    developer: "ФСК",
    houseName: "ЖК Рихард",
    housing: "2 корпус",
    floor: "этаж 14 из 32",
  },
  info: {
    square: 37.5,
    finishing: "White Box",
    deadline: "IV кв. 2023",
  },
  price: 19600000,
}

export const Base = () => {
  return (
    <Wrapper>
      <Card data={mockData} />
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
