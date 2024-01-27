import styled from "@emotion/styled"
import { ColumnType } from "./Cell"

type Props<T> = {
  columns: ColumnType<T>[]
}

export const Header = <T extends object>({ columns }: Props<T>) => {
  return (
    <tr>
      {columns.map((column) => (
        <Cell key={`table-head-cell-${column.key}`}>{column.title}</Cell>
      ))}
    </tr>
  )
}

const Cell = styled.th`
  padding-top: 24px;

  color: #959596;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0.72px;
  text-transform: uppercase;

  &:first-child {
    padding-right: 18px;
  }
  &:last-child {
    padding-left: 18px;
  }
`
