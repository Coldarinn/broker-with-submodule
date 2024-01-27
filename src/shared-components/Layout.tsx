import styled from "@emotion/styled"
import { Header } from "./Header"

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <Header />
      <Wrapper>{children}</Wrapper>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  background: #050505;
`

const Wrapper = styled.div`
  display: flex;

  flex-grow: 1;
`
