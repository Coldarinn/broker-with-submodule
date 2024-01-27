import React from "react"
import { Meta } from "@storybook/react"
import { InputSlider as BaseInputSlider } from "./InputSlider"
import styled from "@emotion/styled"

const InputSliderComponent = (
  props: Partial<React.ComponentProps<typeof BaseInputSlider>>,
) => {
  const [slider, setSlider] = React.useState<number>(1000)

  return (
    <>
      <BaseInputSlider
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
  title: "Components/InputSlider",
  component: BaseInputSlider,
} as Meta

export const Base = () => {
  return (
    <>
      <Wrapper>
        <InputSliderComponent unit="₽" />
        <InputSliderComponent className="storybook-hover" unit="₽" />
        <InputSliderComponent className="storybook-focus" />
        <InputSliderComponent error="Error text" unit="₽" />
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
