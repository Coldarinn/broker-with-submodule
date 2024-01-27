import React from "react"
import { Slider as BaseSlider } from "./Slider"
import styled from "@emotion/styled"
import { FieldRenderProps } from "react-final-form"
import { Error } from "./Error"
import { css } from "@emotion/react"

type Props = React.ComponentProps<typeof BaseSlider<number>> & {
  label?: string
  unit?: string
  error?: string
}

export const InputSlider = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value,
      disabled,
      className,
      onChange,
      label,
      unit,
      error,
    },
    ref,
  ) => {
    return (
      <Wrapper ref={ref} className={className}>
        {label && <Label>{label}</Label>}
        <Content className={className} isError={Boolean(error)}>
          <Field>
            <Input
              type="number"
              value={value}
              disabled={disabled}
              onChange={(e) => onChange(+e.target.value)}
            />

            {unit && (
              <UnitWrapper>
                <UnitValue>{value}</UnitValue>
                <Unit>{unit}</Unit>
              </UnitWrapper>
            )}
          </Field>

          <Slider
            min={min}
            max={max}
            step={step}
            onChange={onChange}
            value={value}
            disabled={disabled}
          />
        </Content>
        <Error>{error}</Error>
      </Wrapper>
    )
  },
)

const Wrapper = styled.div``
const Content = styled.div<{ isError: boolean }>`
  padding: 0 16px;
  display: flex;
  gap: 32px;

  border-radius: 12px;
  border: 1px solid #414141;
  background: #1f1f1f;

  position: relative;

  transition: 200ms;

  &:focus-within {
    border-color: #bb5114;
    .noUi-handle {
      box-shadow: 0px 1px 12px 0px rgba(225, 82, 5, 0.8);
    }
  }
  &:hover {
    .noUi-handle {
      box-shadow: 0px 1px 12px 0px rgba(225, 82, 5, 0.8);
    }
  }

  &.storybook-focus {
    border-color: #bb5114;
    .noUi-handle {
      box-shadow: 0px 1px 12px 0px rgba(225, 82, 5, 0.8);
    }
  }
  &.storybook-hover {
    .noUi-handle {
      box-shadow: 0px 1px 12px 0px rgba(225, 82, 5, 0.8);
    }
  }

  ${({ isError }) =>
    isError &&
    css`
      border-color: #e64242;
      .noUi-connects,
      .noUi-connect {
        background: #e64242;
      }
    `}
`
const Label = styled.label`
  margin-bottom: 12px;
  display: inline-block;

  color: #959596;
  font-size: 12px;
  font-weight: 400;
  line-height: 135%;
  letter-spacing: 0.72px;
  text-transform: uppercase;
`
const Field = styled.div`
  flex: 1;
  position: relative;
`
const Input = styled.input`
  padding: 12px 0;

  color: #fff;
  font-size: 17px;
  font-weight: 400;
  line-height: 144%;

  background: transparent;
  border: none;
  border-radius: 12px;
  outline: none;
  caret-color: #bb5114;
  &:last-of-type {
    text-align: right;
  }
  &:first-of-type {
    text-align: left;
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`
const UnitWrapper = styled.div`
  padding: 12px 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;

  pointer-events: none;
`
const UnitValue = styled.div`
  visibility: hidden;
  pointer-events: none;

  color: #fff;
  font-size: 17px;
  font-weight: 400;
  line-height: 144%;
`
const Unit = styled.div`
  color: #fff;
  font-size: 17px;
  font-weight: 400;
  line-height: 144%;
`
const Slider = styled(BaseSlider<number>)`
  width: calc(100% - 32px);
  position: absolute;
  left: 16px;
  bottom: -1px;
`

export const FieldButtonGroup = React.forwardRef<
  React.ComponentRef<typeof InputSlider>,
  Pick<Props, "label"> &
    FieldRenderProps<Props["value"], React.ComponentRef<typeof InputSlider>>
>(({ input, meta, ...props }, ref) => {
  return (
    <InputSlider
      ref={ref}
      error={meta.touched ? meta.error : undefined}
      {...input}
      {...props}
    />
  )
})
