import styled from "@emotion/styled"
import { Cell, ColumnType } from "./Cell"

type Props<T> = {
  data: T[]
  columns: ColumnType<T>[]
  colGap: number
}

export const Rows = <T extends object>({ data, columns, colGap }: Props<T>) => {
  return (
    <>
      {data.map((item, itemIndex) => (
        <Item key={`table-body-${itemIndex}`}>
          {columns.map((column, columnIndex) => (
            <Cell
              key={`table-row-cell-${columnIndex}`}
              item={item}
              column={column}
              colGap={colGap}
            />
          ))}
        </Item>
      ))}
    </>
  )
}

const Item = styled.tr`
  position: relative;
  &:not(:last-child)::after {
    content: "";

    position: absolute;
    left: 24px;
    right: 24px;
    bottom: 0;

    height: 1px;
    background: #414141;
  }
`
