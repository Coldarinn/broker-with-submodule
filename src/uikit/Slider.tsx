import React from "react"
import noUiSlider, { API } from "nouislider"
import styled from "@emotion/styled"

export type Props<T extends number | [number, number]> = {
  min?: number
  max?: number
  step?: number
  value: T
  disabled?: boolean
  className?: string
  onChange: (payload: T) => void
}

export const Slider = <T extends number | [number, number]>({
  min = 0,
  max = 100,
  step = 1,
  value,
  disabled,
  className,
  onChange,
}: Props<T>) => {
  const onChangeRef = React.useRef(onChange)

  const range = React.useMemo(() => ({ min, max }), [min, max])

  const sliderRef = React.useRef<HTMLDivElement & { noUiSlider: API }>(null)
  const busyRef = React.useRef<boolean>(false)
  const hasValueTo = typeof value !== "number"

  const getSlider = () => sliderRef.current?.noUiSlider

  React.useEffect(() => {
    if (!sliderRef.current) {
      return
    }

    const slider = noUiSlider.create(sliderRef.current, {
      start: value,
      connect: hasValueTo ? true : [true, false],
      step,
      range,
    })

    slider.on("start", () => {
      busyRef.current = true
    })

    slider.on("change", () => {
      busyRef.current = false
    })

    return () => {
      slider.destroy()
    }
  }, [])

  React.useEffect(() => {
    const slider = getSlider()

    if (!slider) {
      return
    }

    slider.updateOptions(
      {
        step,
        range,
      },
      true,
    )
  }, [range, step])

  React.useLayoutEffect(() => {
    const slider = getSlider()

    if (slider && busyRef.current === false) {
      slider.set(value, false)
    }
  }, [value])

  React.useEffect(() => {
    const slider = getSlider()

    if (!slider) {
      return
    }

    const handler = () => {
      if (hasValueTo) {
        const sliderValues = slider.get() as string[]
        const from = Number(sliderValues[0])
        const to = Number(sliderValues[1])

        if (from <= to) {
          onChangeRef.current([from, to] as T)
        } else {
          onChangeRef.current([to, from] as T)
        }
      } else {
        onChangeRef.current(Number(slider.get()) as T)
      }
    }

    slider.on("slide", handler)

    return () => {
      slider.off("slide")
    }
  }, [hasValueTo])

  return <Wrapper className={className} ref={sliderRef} {...{ disabled }} />
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  .noUi-base:hover .noUi-handle {
    box-shadow: 0px 1px 12px 0px rgba(225, 82, 5, 0.8);
  }

  .noUi-base {
    width: 100%;
    height: 1px;

    cursor: pointer;
  }

  .noUi-origin {
    width: calc(100% - 16px);
    height: 0;

    position: absolute;
    top: 0;
    right: 8px;
  }

  .noUi-connects {
    width: 100%;
    height: 100%;

    position: relative;
    z-index: 1;
    background: #bb5114;
  }

  .noUi-connect {
    width: 100%;
    height: 100%;

    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;

    background: linear-gradient(to right, #ac400f, #dd7921);

    transform-style: flat;
    will-change: transform;
    transform-origin: 0 0;
  }

  .noUi-handle {
    width: 24px;
    height: 12px;

    position: absolute;
    top: calc(50% - 6px);
    right: -12px;

    cursor: grab;
    border-radius: 4px;
    background: radial-gradient(
      1166.16% 151.98% at -5.84% 106.58%,
      #ac400f 0%,
      #dd7921 100%
    );

    transition: 200ms;

    &:active {
      box-shadow: 0px 1px 12px 0px rgba(225, 82, 5, 0.8);
    }

    &::before {
      content: "...";

      position: absolute;
      left: 7px;
      top: 0;

      color: #fff;
      font-size: 12px;
      line-height: 6px;
    }
  }
`
