import React from "react"
import { Meta } from "@storybook/react"
import { InputRange as BaseInputRange } from "./InputRange"
import styled from "@emotion/styled"

const InputRangeComponent = (
  props: Partial<React.ComponentProps<typeof BaseInputRange>>,
) => {
  const [slider, setSlider] = React.useState<[number, number]>([1, 500])

  return (
    <>
      <BaseInputRange
        label="Стоимость жилья"
        min={1}
        max={1000}
        value={slider}
        onChange={setSlider}
        {...props}
      />
    </>
  )
}

export default {
  title: "Components/InputRange",
  component: BaseInputRange,
} as Meta

export const Base = () => {
  return (
    <>
      <Wrapper>
        <InputRangeComponent unit="₽" />
        <InputRangeComponent className="storybook-hover" unit="₽" />
        <InputRangeComponent className="storybook-focus" />
        <InputRangeComponent error="Error text" unit="₽" />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: fit-content;
  margin: 80px auto;

  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 30px 30px;
  border: 1px solid #9747ff80;
  border-radius: 8px;
  border-style: dashed;

  .input-range-content {
    width: 364px;
  }
`
