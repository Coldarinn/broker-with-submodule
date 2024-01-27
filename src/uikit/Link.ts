import { Link as LinkBase } from "react-router-dom"
import styled from "@emotion/styled"

export const Link = styled(LinkBase)`
  font-size: 14px;
  color: var(--color-primary);
`

export const LinkNormalized = styled.a`
  color: inherit;
  text-decoration: inherit;
`
