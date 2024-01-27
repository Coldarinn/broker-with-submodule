import React from "react"

export const useClickOutside = (callback: (event: MouseEvent) => void) => {
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [callback])

  return ref
}
