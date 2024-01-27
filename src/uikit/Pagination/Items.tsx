import { Item } from "./Item"
import { Placeholder } from "./More"

const neighborsCount = 2

export type Props = {
  currentPage: number
  pageCount: number
  onPageChange: (page: number) => void
}

const calculateItemsRange = (
  currentPage: number,
  pageCount: number,
): { startPage: number; endPage: number } => {
  const leftBound = currentPage - neighborsCount
  const rightBound = currentPage + neighborsCount

  const leftBoundOverflow = leftBound < 1 ? 1 - leftBound : 0
  const rightBoundOverflow = rightBound > pageCount ? rightBound - pageCount : 0

  let startPage = Math.max(leftBound - rightBoundOverflow, 1)
  let endPage = Math.min(rightBound + leftBoundOverflow, pageCount)

  if (currentPage + neighborsCount < neighborsCount * 2 + 3) {
    endPage = Math.min(neighborsCount * 2 + 3, pageCount)
  }
  if (endPage >= pageCount - 1) {
    startPage = Math.max(pageCount - neighborsCount * 2 - 2, 1)
  }

  return { startPage, endPage }
}

export const Items = ({ currentPage, pageCount, onPageChange }: Props) => {
  const { startPage, endPage } = calculateItemsRange(currentPage, pageCount)

  const Items: JSX.Element[] = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => (
      <Item
        key={`${index}-page`}
        isActive={currentPage === startPage + index}
        onClick={() =>
          currentPage !== startPage + index && onPageChange(startPage + index)
        }
      >
        {startPage + index}
      </Item>
    ),
  )

  return (
    <>
      {startPage > 1 && (
        <>
          <Item
            key={`${1}-page`}
            isActive={currentPage === 1}
            onClick={() => onPageChange(1)}
          >
            1
          </Item>
          {startPage > 2 && <Placeholder />}
        </>
      )}
      {Items}
      {endPage < pageCount && (
        <>
          {endPage < pageCount - 1 && <Placeholder />}
          <Item
            key={`${pageCount}-page`}
            isActive={currentPage === pageCount}
            onClick={() => onPageChange(pageCount)}
          >
            {pageCount}
          </Item>
        </>
      )}
    </>
  )
}
