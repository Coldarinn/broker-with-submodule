import React from "react"
import styled from "@emotion/styled"
import { FieldRenderProps } from "react-final-form"
import { Error } from "@/uikit/Error"
import { PatternFormat } from "react-number-format"
import EyeIcon from "@/assets/images/icons/eye.svg"
import EyeClosedIcon from "@/assets/images/icons/eye-closed.svg"
import CrossIcon from "@/assets/images/icons/cross.svg"
import { ButtonNormalized } from "./Button"

type Props = {
  label?: string
  rightAddons?: React.ReactNode
  leftAddons?: React.ReactNode
  clear?: boolean
  placeholder?: string
  type?: string
  unit?: string
  className?: string
  patternMask?: string
  patternFormat?: string
  patternChar?: string
  value: string
  onChange: (event: any) => void
  error?: string
  success?: string
  disabled?: boolean
  onFocus?: (event: any) => void
  onBlur?: (event: any) => void
  onClear?: (event?: any) => void
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      rightAddons,
      leftAddons,
      clear,
      type = "text",
      unit,
      error,
      success,
      className,
      patternMask = "_",
      patternFormat,
      patternChar,
      onClear,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [isShowPassword, setIsShowPassword] = React.useState(false)

    return (
      <Container className={className}>
        {label && <Label>{label}</Label>}
        <InputWrapper
          className="input-wrapper"
          isError={Boolean(error)}
          isSuccess={Boolean(success)}
        >
          {leftAddons && <Addons>{leftAddons}</Addons>}
          <InputField>
            {patternFormat ?
              <PatternFormat
                mask={patternMask}
                allowEmptyFormatting={isFocused}
                format={patternFormat}
                patternChar={patternChar}
                customInput={InputStyled}
                onValueChange={(values) => {
                  props.onChange?.(values.value)
                }}
                {...props}
                onFocus={(event) => {
                  setIsFocused(true)
                  props.onFocus?.(event)
                }}
                onBlur={(event) => {
                  setIsFocused(false)
                  props.onBlur?.(event)
                }}
              />
            : <InputStyled
                ref={ref}
                type={isShowPassword ? "text" : type}
                {...props}
              />
            }
          </InputField>
          {(rightAddons || type === "password" || unit || clear) && (
            <Addons>
              {unit && <Unit>{unit}</Unit>}
              {clear && (
                <ActionButton type="button" onClick={onClear}>
                  <CrossIcon width={20} height={20} />
                </ActionButton>
              )}
              {rightAddons}
              {type === "password" && (
                <ActionButton
                  type="button"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ?
                    <EyeClosedIcon width={20} height={20} />
                  : <EyeIcon width={20} height={20} />}
                </ActionButton>
              )}
            </Addons>
          )}
        </InputWrapper>
        {success ?
          <Success>{success}</Success>
        : <Error>{error}</Error>}
      </Container>
    )
  },
)

const Container = styled.div`
  display: flex;
  flex-direction: column;

  &:hover,
  &.storybook-hover {
    .input-wrapper:not(:has(input[disabled])) {
      border-color: #959596;
    }
  }

  &.storybook-focus {
    .input-wrapper {
      border-color: #ac400f;
    }
  }
`
const Label = styled.div`
  margin-bottom: 12px;

  color: #959596;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0.72px;
  text-transform: uppercase;
`
const InputWrapper = styled.div<{ isError: boolean; isSuccess: boolean }>`
  display: flex;
  width: 100%;
  margin-bottom: 4px;

  border: 1px solid #414141;
  border-radius: 12px;
  transition: 0.2s;
  background: #1f1f1f;

  ${({ isError }) => isError && "border-color: #E64242;"}
  ${({ isSuccess }) => isSuccess && "border-color: #24BA60;"}
  
  &:focus-within {
    border-color: #ac400f;
    border-inline-end-width: 1px;
    outline: 0;
  }

  &:has(input[disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }
`
const InputField = styled.div`
  max-width: 100%;
  flex-grow: 1;

  position: relative;
`
const InputStyled = styled.input`
  padding: 12px 16px;
  width: 100%;

  font-size: 17px;
  line-height: 144%;
  color: #fff;
  background: none;
  border: none;
  border-radius: 12px;

  vertical-align: bottom;

  &::placeholder {
    color: #959596;
    font-size: 17px;
  }
  &:focus {
    border-color: #ac400f;
    border-inline-end-width: 1px;
    outline: 0;
  }
  &:disabled {
    cursor: not-allowed;
  }

  ::-webkit-inner-spin-button {
    display: none;
  }
`
const Addons = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 12px;

  &:first-child {
    padding-left: 12px;
  }
  &:last-child {
    padding-right: 16px;
  }
`
const ActionButton = styled(ButtonNormalized)`
  width: 20px;
  height: 20px;

  color: #fff;
  cursor: pointer;
`
const Unit = styled.div`
  color: #959596;
  font-size: 17px;
  line-height: 144%;
`
const Success = styled.span`
  height: 14px;

  display: inline-flex;

  color: #147546;
  font-size: 14px;
`

export const FieldInput = React.forwardRef<
  React.ComponentRef<typeof Input>,
  Pick<Props, "label" | "success" | "onClear"> &
    FieldRenderProps<Props["value"], React.ComponentRef<typeof Input>>
>(({ input, meta, success, onClear, ...props }, ref) => {
  const clearHandler = () => {
    input.onChange(undefined)
    onClear?.()
  }

  return (
    <Input
      ref={ref}
      {...input}
      error={meta.touched ? meta.error : undefined}
      success={meta.valid && success ? success : undefined}
      onClear={clearHandler}
      {...props}
    />
  )
})
