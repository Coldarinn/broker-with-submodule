import React from "react"
import { Meta } from "@storybook/react"
import { Input as BaseInput } from "./Input"
import SearchIcon from "@/assets/images/icons/search.svg"
import styled from "@emotion/styled"

export default {
  title: "Components/Input",
  component: BaseInput,
} as Meta

const cols = [
  {},
  {
    leftAddons: (
      <div>
        <SearchIcon width={20} height={20} color="#fff" />
      </div>
    ),
  },
  {
    leftAddons: (
      <div>
        <SearchIcon width={20} height={20} color="#fff" />
      </div>
    ),
    type: "password",
  },
]

const rows = [
  {},
  {
    className: "storybook-hover",
  },
  {
    className: "storybook-focus",
    value: "content",
    clear: true,
  },
  {
    value: "content",
    disabled: true,
  },
  {
    value: "content",
    error: "Error text",
  },
  {
    value: "content",
    success: "Success text",
  },
]

const Input = ({
  ...props
}: Partial<React.ComponentProps<typeof BaseInput>>) => {
  const [value, setValue] = React.useState(props.value || "")

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <BaseInput
      label="LABEL"
      placeholder="Placeholder"
      value={value}
      onChange={onChange}
      onClear={() => setValue("")}
      {...props}
    />
  )
}

export const Base = () => (
  <Wrapper>
    {cols.map((col, colIndex) => (
      <Col key={colIndex}>
        {rows.map((row, rowIndex) => (
          <Input key={`${colIndex}${rowIndex}`} {...col} {...row} />
        ))}
      </Col>
    ))}
  </Wrapper>
)

const Wrapper = styled.div`
  width: fit-content;
  margin: 80px auto;
  padding: 30px 30px;

  display: flex;
  gap: 112px;

  border: 1px solid #9747ff80;
  border-radius: 8px;
  border-style: dashed;

  .storybook {
    &:nth-child(2) {
      width: 111px;
      margin: 0 140px;
    }
    svg {
      opacity: 0;
      height: 0;
    }
  }
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 364px;
`
