import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { ButtonNormalized } from "@/uikit/Button"
import React from "react"
import { FieldRenderProps } from "react-final-form"
import { Error } from "@/uikit/Error"

type ButtonData = {
  isSelected: boolean
  label: string
  id: string
}

type Props = {
  disabled?: boolean
  label?: string
  value: ButtonData[]
  onChange: (data: ButtonData[]) => void
  error?: string
}

type GroupedNear = Array<Array<ButtonData> | ButtonData>

export const ButtonGroup = React.forwardRef<HTMLDivElement, Props>(
  ({ onChange, disabled, value, label, error }, ref) => {
    const modifiedData = getModifiedData(value)

    const onClickItem = (id: string) => () => {
      onChange(
        value.map((item) =>
          item.id === id ?
            {
              ...item,
              isSelected: !item.isSelected,
            }
          : item,
        ),
      )
    }

    return (
      <Wrapper ref={ref}>
        {label && <Label>{label}</Label>}

        <Group disabled={disabled}>
          {modifiedData.map((item) =>
            Array.isArray(item) ?
              <SelectedGroup>
                {item.map(({ id, label }) => (
                  <Button key={id} onClick={onClickItem(id)}>
                    {label}
                  </Button>
                ))}
              </SelectedGroup>
            : <Button key={item.id} onClick={onClickItem(item.id)}>
                {item.label}
              </Button>,
          )}
        </Group>

        <Error>{error}</Error>
      </Wrapper>
    )
  },
)

const getModifiedData = (data: ButtonData[]) => {
  const result: GroupedNear = []

  data.forEach((item) => {
    if (item.isSelected) {
      const lastItem = result[result.length - 1]

      if (Array.isArray(lastItem)) {
        lastItem.push(item)
      } else {
        result.push([item])
      }
    } else {
      result.push(item)
    }
  })

  return result
}

const Button = styled(ButtonNormalized)`
  color: #fff;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  padding: 8px 16px 8px 16px;

  &:disabled {
    opacity: 0.2;
    pointer-events: none;
  }
`

const SelectedGroup = styled.div`
  border-radius: 8px;
  background: radial-gradient(
    1166.16% 151.98% at -5.84% 106.58%,
    #ac400f 0%,
    #dd7921 100%
  );
  box-shadow:
    1px 1px 2px 0px rgba(255, 255, 255, 0.31) inset,
    -1px -1px 2px 0px rgba(33, 41, 48, 0.42) inset;

  transition: 0.2s;

  &.storybook,
  &:hover {
    filter: drop-shadow(0 0 4px rgba(225, 82, 5, 0.5));
  }
`

const Wrapper = styled.div``

const Group = styled.div<{ disabled?: boolean }>`
  display: flex;
  background: #1f1f1f;
  border-radius: 12px;
  padding: 4px;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}
`

const Label = styled.div`
  color: #959596;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0.72px;

  margin-bottom: 12px;
`

export const FieldButtonGroup = React.forwardRef<
  React.ComponentRef<typeof ButtonGroup>,
  Pick<Props, "label"> &
    FieldRenderProps<Props["value"], React.ComponentRef<typeof ButtonGroup>>
>(({ input, meta, ...props }, ref) => {
  return (
    <ButtonGroup
      ref={ref}
      {...input}
      error={meta.touched ? meta.error : undefined}
      {...props}
    />
  )
})
