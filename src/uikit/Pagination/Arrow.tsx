import React from "react"
import { ButtonNormalized } from "@/uikit/Button"
import ArrowIcon from "@/assets/images/icons/chevron.svg"
import { css } from "@emotion/react"
import styled from "@emotion/styled"

type Props = {
  side?: "left" | "right"
} & React.ComponentProps<typeof Button>

export const Arrow = ({ side = "left", ...props }: Props) => (
  <Button {...props}>
    <Icon isLeft={side === "left"} />
  </Button>
)

const Icon = styled(ArrowIcon)<{ isLeft: boolean }>`
  width: 20px;
  height: 20px;

  transform: ${(props) => (props.isLeft ? "rotate(90deg)" : "rotate(-90deg)")};
`
export const Button = styled(ButtonNormalized)<{ isActive?: boolean }>`
  min-width: 42px;
  height: 40px;
  padding: 0px 5px;

  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  border-radius: 8px;

  font-size: 17px;
  line-height: 144%;
  color: #fff;

  ${(props) =>
    props?.isActive &&
    css`
      background: radial-gradient(
        1166.16% 151.98% at -5.84% 106.58%,
        #ac400f 0%,
        #dd7921 100%
      );
      box-shadow:
        1px 1px 2px 0px rgba(255, 255, 255, 0.31) inset,
        -1px -1px 2px 0px rgba(33, 41, 48, 0.42) inset;
    `}

  &:hover {
    background: radial-gradient(
      1166.16% 151.98% at -5.84% 106.58%,
      #ac400f 0%,
      #dd7921 100%
    );
    box-shadow:
      1px 1px 2px 0px rgba(255, 255, 255, 0.31) inset,
      -1px -1px 2px 0px rgba(33, 41, 48, 0.42) inset;
  }
`
