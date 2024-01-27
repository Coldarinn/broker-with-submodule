import { Meta } from "@storybook/react"
import { Select as BaseSelect } from "./Select"
import styled from "@emotion/styled"
import React from "react"

const credits = [
  { value: "Стандартная ипотека", name: "Стандартная ипотека" },
  { value: "Военная ипотека", name: "Военная ипотека" },
  { value: "Коммерческая ипотека", name: "Коммерческая ипотека" },
  { value: "Семейная ипотека", name: "Семейная ипотека" },
  { value: "Субсидии ипотека", name: "Субсидии ипотека" },
  { value: "Субсидированная ипотека", name: "Субсидированная ипотека" },
  {
    value: "По двум документам ипотека",
    name: "По двум документам ипотека",
  },
  { value: "IT иптокеа", name: "IT иптокеа" },
]

const SelectComponent = (
  props: Partial<React.ComponentProps<typeof BaseSelect>>,
) => {
  const [selected, setSelected] = React.useState<(typeof credits)[number]>({
    name: "Стандартная ипотека",
    value: "Стандартная ипотека",
  })

  return (
    <Select
      label="ПРОГРАММА"
      placeholder="Выберите программу"
      options={credits}
      onChange={setSelected}
      value={selected}
      {...props}
    />
  )
}

export default {
  title: "Components/Select",
  component: SelectComponent,
} as Meta

export const Base = () => {
  return (
    <Wrapper>
      <SelectComponent />
      <SelectComponent className="storybook-hover" />
      <SelectComponent className="storybook-opened" />
      <SelectComponent disabled />
    </Wrapper>
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
`
const Select = styled(BaseSelect)`
  width: 364px;
`
