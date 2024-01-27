import React from "react"
import styled from "@emotion/styled"
import { css, SerializedStyles } from "@emotion/react"
import CheckMarkIcon from "@/assets/images/icons/check-mark.svg"
import { FieldRenderProps } from "react-final-form"
import { Error } from "@/uikit/Error.ts"

type size = "L" | "M"

type Props = {
  value: boolean
  onChange: (checked: boolean) => void
  className?: string
  error?: string
  size?: size
}

export const Checkbox = React.forwardRef<HTMLDivElement, Props>(
  ({ value = false, onChange, className, size = "L", error }, ref) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked)
    }

    return (
      <Container className={className} ref={ref}>
        <Label>
          <input type="checkbox" checked={value} onChange={onChangeHandler} />

          <StyledCheckbox size={size}>
            <CheckMarkIcon width={iconSizes[size]} height={iconSizes[size]} />
          </StyledCheckbox>
        </Label>

        <Error>{error}</Error>
      </Container>
    )
  },
)

const Container = styled.div`
  &.storybook-hover {
    input {
      & + div {
        border: 1px solid #414141;
        background: #1f1f1f;
      }

      &:checked + div {
        border: 0;
        background: radial-gradient(
          100% 1081.68% at 0% 18.89%,
          #e84e0e 0%,
          #ff8a1e 80.92%
        );
        box-shadow: 0px 0px 7px 0px rgba(225, 82, 5, 0.5);
      }
    }
  }
`

const Label = styled.label`
  position: relative;

  input {
    position: absolute;
    width: 0;
    height: 0;
    visibility: hidden;

    &:checked + div {
      background: radial-gradient(
        349.52% 1112.54% at -5.84% 106.58%,
        #ac400f 0%,
        #dd7921 100%
      );
      border: 0;

      &:hover {
        background: radial-gradient(
          100% 1081.68% at 0% 18.89%,
          #e84e0e 0%,
          #ff8a1e 80.92%
        );
        box-shadow: 0px 0px 7px 0px rgba(225, 82, 5, 0.5);
      }

      svg {
        display: block;
      }
    }
  }
`

const StyledCheckbox = styled.div<{ size: size }>`
  ${({ size }) => widthSizes[size]}

  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #414141;
  background: #1f1f1f;
  cursor: pointer;

  svg {
    color: #fff;
    display: none;
  }
`

const widthSizes: Record<size, SerializedStyles> = {
  L: css`
    width: 24px;
    height: 24px;
    border-radius: 8px;
  `,
  M: css`
    width: 16px;
    height: 16px;
    border-radius: 5px;
  `,
}

const iconSizes: Record<size, number> = {
  L: 20,
  M: 16,
}

export const FieldCheckbox = React.forwardRef<
  React.ComponentRef<typeof Checkbox>,
  FieldRenderProps<Props["value"], React.ComponentRef<typeof Checkbox>>
>(({ input, meta, ...props }, ref) => {
  return (
    <Checkbox
      ref={ref}
      {...input}
      error={meta.touched ? meta.error : undefined}
      {...props}
    />
  )
})
