import React from "react"
import styled from "@emotion/styled"
import { Items } from "./Items"
import { Arrow } from "./Arrow"
import { useSearchParams } from "react-router-dom"

export const Pagination = ({
  currentPage,
  pageCount,
  onPageChange,
}: React.ComponentProps<typeof Items>) => {
  const previousPage = currentPage - 1
  const nextPage = currentPage + 1

  return (
    <Wrapper>
      <Arrow
        side="left"
        onClick={() => previousPage >= 1 && onPageChange(previousPage)}
      />
      <Items
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={onPageChange}
      />
      <Arrow
        side="right"
        onClick={() => nextPage <= pageCount && onPageChange(nextPage)}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 4px;
  height: fit-content;
  width: fit-content;

  display: flex;

  background-color: #1f1f1f;
  border-radius: 12px;
`

export const usePaginationQuery = (initialPage: number = 1) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [page, setPage] = React.useState<number>(
    Number(searchParams.get("page")) || initialPage,
  )

  const setPageWithQuery = (newPage: number) => {
    setPage(newPage)
    setSearchParams((prev) => ({ ...prev, page: String(newPage) }))
  }

  return [page, setPageWithQuery] as const
}
