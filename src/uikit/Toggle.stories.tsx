import { Meta } from "@storybook/react"
import styled from "@emotion/styled"
import React from "react"
import { Toggle } from "@/uikit/Toggle"

export default {
  title: "Components/Toggle",
  component: Toggle,
} as Meta

export const Base = () => {
  const [isChecked, setIsChecked] = React.useState(false)

  return (
    <Wrapper>
      <Flex>
        <SubTitle>Default:</SubTitle>

        <Toggle value={isChecked} onChange={setIsChecked} />
      </Flex>

      <Flex>
        <SubTitle>Default hover:</SubTitle>

        <Toggle value={false} onChange={() => {}} className="storybook-hover" />
      </Flex>

      <Flex>
        <SubTitle>Active:</SubTitle>

        <Toggle value={true} onChange={() => {}} />
      </Flex>

      <Flex>
        <SubTitle>Active hov:</SubTitle>

        <Toggle value={true} onChange={() => {}} className="storybook-hover" />
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
