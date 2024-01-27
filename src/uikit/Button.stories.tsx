import React from "react"
import { Meta } from "@storybook/react"
import { Button, Wrapper, WrapperBlock } from "./Button"
import SvgIcon from "@/assets/images/icons/plus.svg"

export default {
  title: "Components/Button",
  component: Button,
} as Meta

type ButtonProps = React.ComponentProps<typeof Button>

const Template = (args: ButtonProps) => <Button {...args} />

const colors = ["primary", "secondary"] as const
const sizes = ["L", "M", "S"] as const
const states = ["default", "hover", "isLoading", "disabled"] as const

const baseProps: ButtonProps = {
  children: "ВЫБРАТЬ КВАРТИРУ",
  disabled: false,
  isLoading: false,
  color: "primary",
  size: "L",
}

const basePropsIcon: ButtonProps = {
  ...baseProps,
  children: (
    <>
      <SvgIcon width={20} height={20} />
      <span>ВЫБРАТЬ КВАРТИРУ</span>
    </>
  ),
}

export const AllCombinations = () => (
  <Wrapper>
    <WrapperBlock
      style={{
        gridColumnGap: "47px",
        marginBottom: "56px",
        gridTemplateColumns: "211px 195px 150px",
      }}
    >
      {colors.map((color) =>
        states.map((state) =>
          sizes.map((size) => {
            const props: ButtonProps = {
              ...baseProps,
              size,
              color,
              disabled: state === "disabled",
              isLoading: state === "isLoading",
            }

            return (
              <Template
                key={`${size}-${color}-${state}`}
                // @ts-ignore
                className={state === "hover" ? "storybook" : ""}
                {...props}
              />
            )
          }),
        ),
      )}
    </WrapperBlock>
    <WrapperBlock
      style={{
        gridColumnGap: "29px",
        gridTemplateColumns: "227px 215px 174px",
      }}
    >
      {colors.map((color) =>
        states.map((state) =>
          sizes.map((size) => {
            const props: ButtonProps = {
              ...basePropsIcon,
              size,
              color,
              disabled: state === "disabled",
              isLoading: state === "isLoading",
            }

            return (
              <Template
                key={`${size}-${color}-${state}`}
                // @ts-ignore
                className={state === "hover" ? "storybook" : ""}
                {...props}
              />
            )
          }),
        ),
      )}
    </WrapperBlock>
  </Wrapper>
)
