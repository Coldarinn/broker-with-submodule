import { ComponentRef, forwardRef } from "react"
import styled from "@emotion/styled"
import { FieldRenderProps } from "react-final-form"
import { Error } from "@/uikit/Error"
import { css } from "@emotion/react"

type Props = {
  value: string
  error?: string
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  onChange: (event: any) => void
  onFocus?: (event: any) => void
  onBlur?: (event: any) => void
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <Container>
        {label && <Label>{label}</Label>}
        <InputStyled ref={ref} {...props} />
        <Error>{props.error}</Error>
      </Container>
    )
  },
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const InputStyled = styled.textarea<{ error?: string }>`
  width: 100%;
  height: 72px;
  margin-bottom: 4px;
  padding: 12px 16px;

  border: 1px solid #414141;
  border-radius: 12px;
  background: #1f1f1f;
  transition: all 0.2s;

  font-size: 17px;
  line-height: 144%;
  color: #fff;

  resize: none;

  &::placeholder {
    color: #959596;
    font-size: 17px;
  }

  &:hover,
  &.storybook-hover {
    border-color: #959596;
  }

  &:focus,
  &.storybook-focus {
    border-color: #ac400f;
    border-inline-end-width: 1px;
    outline: 0;
  }

  &:disabled {
    pointer-events: none;
    border-color: #414141;
  }

  ${({ error }) =>
    error &&
    css`
      border-color: var(--color-error) !important;
    `}
`
const Label = styled.div`
  color: #959596;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0.72px;

  margin-bottom: 12px;
`

export const FieldTextArea = forwardRef<
  ComponentRef<typeof TextArea>,
  Pick<Props, "label"> &
    FieldRenderProps<Props["value"], ComponentRef<typeof TextArea>>
>(({ input, meta, ...props }, ref) => {
  return (
    <TextArea
      ref={ref}
      {...props}
      {...input}
      error={meta.touched ? meta.error : undefined}
    />
  )
})
