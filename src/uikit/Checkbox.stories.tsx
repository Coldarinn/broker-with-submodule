import { Meta } from "@storybook/react"
import styled from "@emotion/styled"
import React from "react"
import { Checkbox } from "@/uikit/Checkbox"

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} as Meta

export const Base = () => {
  const [isCheckedL, setIsCheckedL] = React.useState(false)
  const [isCheckedM, setIsCheckedM] = React.useState(false)

  return (
    <Wrapper>
      <Grid>
        <SubTitle />

        <SubTitle>L:</SubTitle>
        <SubTitle>M:</SubTitle>
      </Grid>

      <Grid>
        <SubTitle>Default:</SubTitle>

        <Checkbox size="L" value={isCheckedL} onChange={setIsCheckedL} />

        <Checkbox size="M" value={isCheckedM} onChange={setIsCheckedM} />
      </Grid>

      <Grid>
        <SubTitle>Default hover:</SubTitle>

        <Checkbox
          size="L"
          value={false}
          onChange={() => {}}
          className="storybook-hover"
        />

        <Checkbox
          size="M"
          value={false}
          onChange={() => {}}
          className="storybook-hover"
        />
      </Grid>

      <Grid>
        <SubTitle>Active:</SubTitle>

        <Checkbox size="L" value={true} onChange={() => {}} />

        <Checkbox size="M" value={true} onChange={() => {}} />
      </Grid>

      <Grid>
        <SubTitle>Active hover:</SubTitle>

        <Checkbox
          size="L"
          value={true}
          onChange={() => {}}
          className="storybook-hover"
        />

        <Checkbox
          size="M"
          value={true}
          onChange={() => {}}
          className="storybook-hover"
        />
      </Grid>

      <Grid>
        <SubTitle>Error:</SubTitle>

        <Checkbox size="L" value={false} onChange={() => {}} error="Error" />

        <Checkbox size="M" value={false} onChange={() => {}} error="Error" />
      </Grid>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-gap: 24px;

  width: fit-content;
  margin: 20px auto;

  padding: 20px 40px;
  border: 1px solid #9747ff80;
  border-radius: 8px;
  border-style: dashed;
`

const SubTitle = styled.span`
  width: 90px;
  color: #fff;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  text-align: center;
  gap: 24px;
`
