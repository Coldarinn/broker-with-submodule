import React from "react"
import { Button } from "./Arrow"

type Props = {
  isActive?: boolean
} & React.ComponentProps<typeof Button>

export const Item = ({ children, ...props }: Props) => (
  <Button {...props}>{children}</Button>
)
