import styled from "@emotion/styled"

export const Placeholder = () => <Container>...</Container>

const Container = styled.div`
  width: 42px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  border-radius: 8px;

  font-size: 17px;
  line-height: 144%;
  color: #fff;
`
