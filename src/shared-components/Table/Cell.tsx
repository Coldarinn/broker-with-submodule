import React from "react"
import { Tooltip } from "@/uikit/Tooltip"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

export type ColumnType<T> = {
  key: string
  title: string
  width?: number
  render?: (column: ColumnType<T>, item: T) => void
}

type Props<T> = {
  item: T
  column: ColumnType<T>
  colGap: number
}

export const Cell = <T extends object>({ item, column, colGap }: Props<T>) => {
  const value = get(item, column.key)

  const [isHidden, setIsHidden] = React.useState(false)

  const checkHeight = (domNode: HTMLDivElement) => {
    if (!column.render && domNode && !isHidden) {
      setIsHidden(domNode.scrollHeight > domNode.clientHeight)
    }
  }

  return (
    <Content width={column.width} colGap={colGap}>
      {column.render?.(column, item) ?? (
        <WebkitBox ref={checkHeight}>
          {isHidden ?
            <Tooltip
              content={value}
              placement="bottom-start"
              className="cell-tooltip"
              withArrow
            >
              {() => <Text>{value}</Text>}
            </Tooltip>
          : value}
        </WebkitBox>
      )}
    </Content>
  )
}

// analog lodash.get
function get(obj: any, ...props: string[]): any {
  return (
    obj &&
    props.reduce(
      (result, prop) => (result == null ? undefined : result[prop]),
      obj,
    )
  )
}

const Content = styled.td<
  Pick<React.CSSProperties, "width"> & { colGap: number }
>`
  padding: 24px ${({ colGap }) => colGap}px;
  ${({ width }) =>
    width ?
      typeof width === "number" ?
        css`
          max-width: ${width}px;
          min-width: ${width}px;
        `
      : css`
          max-width: ${width};
          min-width: ${width};
        `
    : ""}

  text-align: center;
  color: #fff;
  font-size: 16px;

  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
`
const WebkitBox = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;

  overflow-wrap: break-word;

  .cell-tooltip {
    line-height: 1;
    z-index: 3;

    .popper-content {
      min-width: 300px;
      max-width: 768px;
      padding: 24px;

      border-radius: 12px;
      text-align: left;
    }
  }
`
const Text = styled.div`
  transition: 0.2s;

  &:hover {
    color: #ff8a25;
  }
`
