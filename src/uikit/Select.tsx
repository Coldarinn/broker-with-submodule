import React from "react"
import { FieldRenderProps } from "react-final-form"
import ArrowIcon from "@/assets/images/icons/chevron.svg"
import { ButtonNormalized } from "./Button"
import styled from "@emotion/styled"
import { composeRefs } from "@/modules/utils/composeRefs"
import { useClickOutside } from "@/modules/utils/useClickOutside"
import { usePopper } from "react-popper"
import { Error } from "@/uikit/Error.ts"
import { css } from "@emotion/react"

export type option = {
  value: string
  name: string
}

type Props = {
  value?: option | string
  options: option[]
  label?: string
  placeholder?: string
  className?: string
  error?: string
  disabled?: boolean
  onChange: (option: option) => void
}

export const Select = React.forwardRef<HTMLSelectElement, Props>(
  (
    {
      value,
      options,
      label,
      placeholder,
      className,
      onChange,
      error,
      disabled,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(
      className?.includes("storybook-opened") ? true : false,
    )

    const [referenceElement, setReferenceElement] =
      React.useState<HTMLElement | null>(null)
    const [popperElement, setPopperElement] =
      React.useState<HTMLElement | null>(null)

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement: "bottom",
      strategy: "fixed",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, -10],
          },
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: ["top", "bottom", "right", "left", "auto"],
          },
        },
      ],
    })

    const selectHandler = (option: option) => {
      onChange(option)
      setIsOpen(false)
    }

    const clickOutsideRef = useClickOutside(() => {
      if (isOpen) {
        setIsOpen(false)
      }
    })

    const handleClick = (e: Event) => {
      e.stopPropagation()
      setIsOpen(!isOpen)
    }

    return (
      <Container
        ref={composeRefs([setReferenceElement, clickOutsideRef, ref] as any)}
        className={className}
        onClick={handleClick as any}
        isDisabled={disabled}
        {...attributes.popper}
      >
        {label && <Label>{label}</Label>}

        <SelectHeader
          className="select-header"
          type="button"
          isDisabled={disabled}
        >
          {typeof value === "object" ?
            value?.name
          : value || placeholder || label || "Выберите"}
          <Arrow isOpen={isOpen} />
        </SelectHeader>
        <Content
          ref={setPopperElement}
          isOpen={isOpen}
          onClick={(e) => e.stopPropagation()}
          style={{
            ...styles.popper,
            minWidth: referenceElement?.offsetWidth || "auto",
          }}
        >
          {options.map((option) => (
            <OptionItem
              key={option.value}
              type="button"
              onClick={() => selectHandler(option)}
            >
              {option.name}
            </OptionItem>
          ))}
        </Content>
        <Error>{error}</Error>
      </Container>
    )
  },
)

const Container = styled.div<{ isDisabled?: boolean }>`
  display: flex;
  flex-direction: column;
  height: fit-content;
  &:hover,
  &.storybook-hover {
    .select-header {
      color: #959596;
      border-color: #959596;
    }
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
      .select-header {
        opacity: 0.5;
      }
    `}
`
const SelectHeader = styled(ButtonNormalized)<{ isDisabled?: boolean }>`
  position: relative;
  display: block;
  width: 100%;

  margin-bottom: 4px;
  padding: 12px 16px;

  border: 1px solid #414141;
  border-radius: 12px;
  transition: 0.2s;
  background: #1f1f1f;

  font-size: 17px;
  line-height: 144%;
  color: #fff;
  text-align: left;
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: gray;
    `}
`

const Arrow = styled(ArrowIcon)<{ isOpen: boolean }>`
  width: 20px;
  height: 20px;
  color: #fff;
  position: absolute;
  right: 12px;
  top: 50%;
  transition: 0.2s;

  transform: ${(props) =>
    props.isOpen ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)"};
`

const Label = styled.div`
  color: #959596;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0.72px;

  margin-bottom: 12px;
`
const OptionItem = styled(ButtonNormalized)`
  display: block;
  width: 100%;

  color: #fff;
  font-size: 17px;
  line-height: 144%;
  text-align: left;

  padding: 12px;
  border-radius: 8px;

  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #414141;
  }
`
const Content = styled.div<{ isOpen: boolean }>`
  max-height: 400px;
  overflow-y: auto;
  background: #1f1f1f;
  border-radius: 12px;
  padding: 4px;
  z-index: 2;

  transition:
    opacity 0.2s,
    visibility 0.2s,
    pointer-events 0.2s;

  ${({ isOpen }) =>
    isOpen ?
      `
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      `
    : `
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      `}
`

export const FieldSelect = React.forwardRef<
  React.ComponentRef<typeof Select>,
  Pick<Props, "label"> &
    Pick<Props, "options"> &
    FieldRenderProps<Props["value"], React.ComponentRef<typeof Select>>
>((props, ref) => {
  const { input, meta, ...otherProps } = props

  return (
    <Select
      ref={ref}
      {...input}
      error={meta.touched ? meta.error : undefined}
      {...otherProps}
    />
  )
})
