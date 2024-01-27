import React from "react"
import styled from "@emotion/styled"
import { FieldRenderProps } from "react-final-form"
import { Error } from "@/uikit/Error.ts"

type Props = {
  value?: boolean
  onChange: (checked: boolean) => void
  className?: string
  error?: string
}

export const Toggle = React.forwardRef<HTMLDivElement, Props>(
  ({ value = false, onChange, className, error }, ref) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked)
    }

    return (
      <Wrapper ref={ref}>
        <Label className={className}>
          <Checkbox
            type="checkbox"
            checked={value}
            onChange={onChangeHandler}
          />

          <ToggleWithButton />
        </Label>

        <Error>{error}</Error>
      </Wrapper>
    )
  },
)

const Wrapper = styled.div``

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;

  &.storybook-hover {
    span {
      background: rgba(65, 65, 65, 1);
    }

    input:checked + span {
      background: rgba(232, 78, 14, 1);
    }
  }
`

const Checkbox = styled.input`
  position: absolute;
  visibility: hidden;
  width: 0;
  height: 0;

  &:checked + span {
    background: rgba(172, 64, 15, 1);

    &:hover {
      background: rgba(232, 78, 14, 1);
    }

    &:before {
      left: calc(100% - 32%);
    }
  }
`

const ToggleWithButton = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.2s;
  cursor: pointer;
  background: rgba(149, 149, 150, 1);
  border-radius: 30px;

  &:hover {
    background: rgba(65, 65, 65, 1);
  }

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    top: 50%;
    left: 32%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 50%;
    transition: 0.2s;
  }
`

export const FieldToggle = React.forwardRef<
  React.ComponentRef<typeof Toggle>,
  FieldRenderProps<Props["value"], React.ComponentRef<typeof Toggle>>
>(({ input, meta, ...props }, ref) => {
  return (
    <Toggle
      ref={ref}
      {...input}
      error={meta.touched ? meta.error : undefined}
      {...props}
    />
  )
})
