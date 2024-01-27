import React from "react"
import styled from "@emotion/styled"
import { SerializedStyles, css, keyframes } from "@emotion/react"

type color = "primary" | "secondary"
type size = "L" | "M" | "S"

export type Props = React.PropsWithChildren<{
  disabled?: boolean
  isLoading?: boolean
  color?: color
  size?: size
  as?: any
}> &
  Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick">

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    { isLoading = false, size = "L", color = "primary", children, ...props },
    ref,
  ) => {
    return (
      <ButtonStyled ref={ref} size={size} color={color} {...props}>
        {(isLoading ? <Loader size={size} /> : children) ?? null}
      </ButtonStyled>
    )
  },
)

const Loader = styled.span<{ size: size }>`
  ${({ size }) => loaderSizes[size]}

  flex-shrink: 0;

  animation: ${keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`} 1.5s linear infinite;

  border: 2px solid white;
  border-radius: 50%;
  border-right-color: transparent;
  transform-origin: center center;
`

export const ButtonNormalized = React.forwardRef<
  React.ComponentRef<typeof ButtonNormalizedStyled>,
  React.ComponentProps<typeof ButtonNormalizedStyled>
>((props, ref) => {
  return <ButtonNormalizedStyled ref={ref} type={"button"} {...props} />
})

const ButtonNormalizedStyled = styled.button`
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  outline: none;
  line-height: normal;
  overflow: visible;
  padding: 0;
  cursor: pointer;
  appearance: none;
  text-decoration: none;
`

const ButtonStyled = styled(ButtonNormalized)<Props>`
  ${({ size }) => sizes[size ?? "L"]}
  ${({ color }) => colors[color ?? "primary"]}

  color: #fff;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  transition: 0.2s;

  &:disabled {
    opacity: 0.2;
    pointer-events: none;
  }
`
const sizes: Record<size, SerializedStyles> = {
  L: css`
    padding: 14px 32px;
    border-radius: 12px;
    font-size: 15px;
    line-height: 136%;
    letter-spacing: 0.9px;
    & > svg,
    & > img {
      &:first-child:not(:last-child) {
        margin-left: -12px;
      }
      &:last-child:not(:first-child) {
        margin-right: -12px;
      }
    }
  `,
  M: css`
    padding: 10px 24px;
    border-radius: 12px;
    font-size: 15px;
    line-height: 136%;
    letter-spacing: 0.9px;
    & > svg,
    & > img {
      &:first-child:not(:last-child) {
        margin-left: -8px;
      }
      &:last-child:not(:first-child) {
        margin-right: -8px;
      }
    }
  `,
  S: css`
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 12px;
    line-height: 135%;
    letter-spacing: 0.72px;
    & > svg,
    & > img {
      &:first-child:not(:last-child) {
        margin-left: -4px;
      }
      &:last-child:not(:first-child) {
        margin-right: -4px;
      }
    }
  `,
}

const loaderSizes: Record<size, SerializedStyles> = {
  L: css`
    width: 16px;
    height: 16px;
  `,
  M: css`
    width: 14px;
    height: 14px;
  `,
  S: css`
    width: 14px;
    height: 14px;
  `,
}

const colors: Record<color, SerializedStyles> = {
  primary: css`
    background: radial-gradient(
      1166.16% 151.98% at -5.84% 106.58%,
      #ac400f 0%,
      #dd7921 100%
    );
    box-shadow:
      1px 1px 2px 0px rgba(255, 255, 255, 0.31) inset,
      -1px -1px 2px 0px rgba(33, 41, 48, 0.42) inset;
    &.storybook,
    &:hover {
      box-shadow:
        1px 1px 2px 0px rgba(255, 255, 255, 0.31) inset,
        -1px -1px 2px 0px rgba(33, 41, 48, 0.42) inset,
        0px 0px 16px 0px rgba(225, 82, 5, 0.5);
    }
  `,
  secondary: css`
    background: #414141;
    box-shadow:
      1px 1px 2px 0px rgba(255, 255, 255, 0.11) inset,
      -1px -1px 2px 0px rgba(33, 41, 48, 0.42) inset;
    &.storybook,
    &:hover {
      background: #959596;
    }
  `,
}

export const Wrapper = styled.div`
  width: fit-content;
  margin: 20px auto;

  padding: 20px 40px;
  border: 1px solid #9747ff80;
  border-radius: 8px;
  border-style: dashed;
`

export const WrapperBlock = styled.div`
  display: grid;
  grid-row-gap: 24px;
`
