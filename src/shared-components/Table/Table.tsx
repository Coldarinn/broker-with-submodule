import styled from "@emotion/styled"

import { ColumnType } from "./Cell"
import { Header } from "./Header"
import { Rows } from "./Rows"

type Props<T> = {
  data: T[]
  columns: ColumnType<T>[]
  minWidth?: number
  colGap?: number
}

export const Table = <T extends object>({
  data,
  columns,
  minWidth,
  colGap = 18,
}: Props<T>) => {
  return (
    <Wrapper>
      <Content style={{ minWidth: minWidth }}>
        <thead>
          <Header columns={columns} />
        </thead>
        <tbody>
          <Rows data={data} columns={columns} colGap={colGap} />
        </tbody>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 100%;
  padding: 24px;

  overflow: auto;
  border-radius: 24px;
  background: #141414;
`
const Content = styled.table`
  width: 100%;

  border-radius: 24px;
  border-collapse: collapse;
`
