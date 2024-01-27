import { Meta } from "@storybook/react"
import { Tooltip as BaseTooltip } from "./Tooltip"
import QuestionIcon from "@/assets/images/icons/question.svg"
import styled from "@emotion/styled"

export default {
  title: "Components/Tooltip",
  component: BaseTooltip,
} as Meta

export const Base = () => (
  <Content>
    <Tooltip
      content="Какой то текст подсказки для поля ввода"
      placement="top"
      withArrow
      offset={[0, 10]}
    >
      {() => <Icon />}
    </Tooltip>

    <Wrapper>
      <div
        style={{
          display: "flex",
        }}
      >
        <BaseTooltip
          className="storybook"
          content="Какой то текст"
          placement="right"
          withArrow
          offset={[0, 0]}
        >
          {() => <Icon />}
        </BaseTooltip>
        <BaseTooltip
          className="storybook"
          content="Какой то текст"
          placement="top"
          withArrow
          offset={[0, -32]}
        >
          {() => <Icon />}
        </BaseTooltip>
        <BaseTooltip
          className="storybook"
          content="Какой то текст"
          placement="left"
          withArrow
          offset={[0, 0]}
        >
          {() => <Icon />}
        </BaseTooltip>
      </div>
    </Wrapper>
  </Content>
)

const Content = styled.div`
  width: fit-content;
  margin: 80px auto;
`
const Wrapper = styled.div`
  padding: 30px 30px;
  border: 1px solid #9747ff80;
  border-radius: 8px;
  border-style: dashed;

  .storybook {
    &:nth-child(2) {
      width: 111px;
      margin: 0 140px;
    }
    svg {
      opacity: 0;
      height: 0;
    }
  }
`
const Icon = styled(QuestionIcon)`
  color: #fff;
  width: 20px;
  height: 20px;
`
const Tooltip = styled(BaseTooltip)`
  width: fit-content;
  margin-bottom: 24px;

  .popper-content {
    max-width: 185px;
  }
`
