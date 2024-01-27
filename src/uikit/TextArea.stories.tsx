import { Meta } from "@storybook/react"
import { TextArea } from "@/uikit/TextArea"
import styled from "@emotion/styled"
import React from "react"

type TextAreaProps = React.ComponentProps<typeof TextArea>

const baseProps: TextAreaProps = {
  label: "Label",
  value: "",
  placeholder: "Placeholder",
  onChange: () => {},
}

const TextAreaStoryBook = (props: TextAreaProps) => {
  const [value, setValue] = React.useState(props.value || "")

  const onTextAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return <TextArea {...props} value={value} onChange={onTextAreaChange} />
}

export default {
  title: "Components/TextArea",
  component: TextAreaStoryBook,
} as Meta

export const AllCombinations = () => (
  <Wrapper>
    <Flex>
      <SubTitle>Default:</SubTitle>
      <TextAreaStoryBook {...baseProps} />
    </Flex>

    <Flex>
      <SubTitle>Hover:</SubTitle>
      <TextAreaStoryBook {...baseProps} className="storybook-hover" />
    </Flex>

    <Flex>
      <SubTitle>Focus:</SubTitle>
      <TextAreaStoryBook {...baseProps} className="storybook-focus" />
    </Flex>

    <Flex>
      <SubTitle>Error:</SubTitle>
      <TextAreaStoryBook {...baseProps} error="Error" />
    </Flex>

    <Flex>
      <SubTitle>Disabled:</SubTitle>
      <TextAreaStoryBook {...baseProps} disabled />
    </Flex>
  </Wrapper>
)

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
