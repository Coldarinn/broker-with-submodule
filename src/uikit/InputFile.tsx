import React from "react"
import type { DropTargetMonitor } from "react-dnd"
import { useDrop } from "react-dnd"
import { NativeTypes } from "react-dnd-html5-backend"
import styled from "@emotion/styled"
import { FieldRenderProps } from "react-final-form"
import { Button, ButtonNormalized } from "./Button"
import TrashIcon from "@/assets/images/icons/trash.svg"
import DocumentIconBase from "@/assets/images/icons/document.svg"
import { Error } from "@/uikit/Error.ts"

type Props = {
  name: string
  onChange: (value: File[]) => void
  value: File[]
  onBlur?: () => void
  error?: string
  maxSizeInMB: number
}

export const InputFiles: React.FC<Props> = ({
  name,
  value: files,
  onChange: onChangeBase,
  onBlur,
  error,
  maxSizeInMB,
}) => {
  const onChange = (newFiles: File[] | FileList | null) => {
    onChangeBase?.([...files, ...Array.from(newFiles ?? [])])
    onBlur?.()
  }
  const fileSizeTotalInMb = Math.max(
    0.1,
    byteToMB(files.reduce((sum, { size }) => sum + size, 0)),
  )
  const isLimitTooHigh = fileSizeTotalInMb > maxSizeInMB
  return (
    <Container>
      {files.length > 0 && (
        <List>
          {files.map((file) => (
            //TODO: fix uniq
            <FileItem key={`${file.name}-${file.lastModified}`}>
              <DocumentIcon />
              <span>
                <small>{Math.max(0.1, byteToMB(file.size))}mb</small>{" "}
                {file.name}
              </span>
              <RemoveButton
                onClick={() =>
                  onChangeBase(
                    files.filter((fileOnDelete) => fileOnDelete !== file),
                  )
                }
              >
                <TrashIcon />
              </RemoveButton>
            </FileItem>
          ))}
        </List>
      )}
      <Label>
        <DNDBox onDrop={onChange} isError={isLimitTooHigh}>
          {isLimitTooHigh ?
            `Слишком большой размер файла`
          : `Перетащите сюда файлы для загрузки (${fileSizeTotalInMb}/${maxSizeInMB} МБ)`
          }
        </DNDBox>
        <Button as="div">ЗАГРУЗИТЬ...</Button>
        <HiddenInput
          type="file"
          name={name}
          multiple
          onChange={(event) => {
            onChange(event.currentTarget.files)
          }}
        />
      </Label>
      <Error>{error}</Error>
    </Container>
  )
}

const Container = styled.div``
const Label = styled.label`
  display: flex;
  align-items: flex-start;

  cursor: pointer;
`
const HiddenInput = styled.input`
  display: none;
`
const List = styled.div`
  padding: 16px;
  max-height: 90px;
  margin-bottom: 24px;

  display: grid;
  grid-auto-flow: row;
  gap: 10px;

  overflow-y: auto;

  border-radius: 12px;
  background: rgba(31, 31, 31, 1);
`
const FileItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 17px;
  color: white;

  //TODO: maybe add
  span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`
const RemoveButton = styled(ButtonNormalized)`
  margin-left: auto;

  transition: 225ms;
  color: rgba(149, 149, 150, 1);
  &:hover {
    color: rgba(255, 138, 37, 1);
  }
`
const DocumentIcon = styled(DocumentIconBase)`
  color: #ff8a25;
`

const DNDBox: React.FC<
  React.PropsWithChildren<{
    onDrop: (files: FileList) => void
    isError: boolean
  }>
> = ({ onDrop, children, isError }) => {
  const [{ isActive }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: FileList }) {
        onDrop?.(item.files)
      },
      collect: (monitor: DropTargetMonitor) => ({
        isActive: monitor.isOver() && monitor.canDrop(),
      }),
    }),
    [onDrop],
  )
  return (
    <Target ref={drop} isActive={isActive} isError={isError}>
      {children}
    </Target>
  )
}

const Target = styled.div<{ isActive: boolean; isError: boolean }>`
  padding: 14px;
  margin-right: 24px;
  width: 100%;

  display: flex;
  justify-content: center;

  transition: 225ms;

  border-radius: 12px;
  border: 2px dashed #414141;
  color: #959596;
  font-size: 14px;
  line-height: 144%;

  ${({ isError }) => (isError ? "border-color: #E64242; color: #E64242;" : "")}
  ${({ isActive }) => (isActive ? "border-color: #ff8a25;" : "")}
`

export const FieldInputFiles = React.forwardRef<
  React.ComponentRef<typeof InputFiles>,
  Pick<Props, "maxSizeInMB"> & FieldRenderProps<Props["value"]>
>(({ input, meta, ...props }) => {
  return (
    <InputFiles
      {...input}
      value={input.value ? input.value : []}
      error={meta.touched ? meta.error : undefined}
      {...props}
    />
  )
})

const byteToMB = (countByte: number) => {
  return Number((countByte / 1024 / 1024).toFixed(1))
}
