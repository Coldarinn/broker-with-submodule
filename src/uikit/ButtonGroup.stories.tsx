import { Meta } from "@storybook/react"
import styled from "@emotion/styled"
import React from "react"
import { ButtonGroup } from "@/uikit/ButtonGroup"

const buttonsData = [
  {
    id: "studio-0",
    isSelected: true,
    label: "Студия",
  },
  {
    id: "one-1",
    isSelected: true,
    label: "1",
  },
  {
    id: "two-2",
    isSelected: false,
    label: "2",
  },
  {
    id: "three-3",
    isSelected: false,
    label: "3",
  },
  {
    id: "four-4",
    isSelected: true,
    label: "4",
  },
]

export default {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
} as Meta

export const Base = () => {
  const [data, setData] = React.useState(buttonsData)

  return (
    <Wrapper>
      <Flex>
        <SubTitle>Default:</SubTitle>
        <ButtonGroup label="КОМНАТНОСТЬ" value={data} onChange={setData} />
      </Flex>

      <Flex>
        <SubTitle>Disabled:</SubTitle>
        <ButtonGroup
          label="КОМНАТНОСТЬ"
          value={data}
          onChange={setData}
          disabled
        />
      </Flex>

      <Flex>
        <SubTitle>Error:</SubTitle>
        <ButtonGroup
          label="КОМНАТНОСТЬ"
          value={data}
          onChange={setData}
          error="Error"
        />
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
  width: 90px;
  color: #fff;
`
