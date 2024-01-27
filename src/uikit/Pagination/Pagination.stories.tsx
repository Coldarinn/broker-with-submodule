import React from "react"
import { Meta } from "@storybook/react"
import { Pagination as BasePagination } from "./Pagination"
import styled from "@emotion/styled"

export default {
  title: "Components/Pagination",
  component: BasePagination,
} as Meta

export const Base = () => {
  const [page, setPage] = React.useState(1)

  return (
    <Wrapper>
      <BasePagination
        currentPage={page}
        pageCount={20}
        onPageChange={setPage}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: fit-content;
  margin: 80px auto;

  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 30px 30px;
  border: 1px solid #9747ff80;
  border-radius: 8px;
  border-style: dashed;
`
