import React from "react"

type Ref<T> = React.RefCallback<T> | React.ForwardedRef<T>

export const composeRefs =
  <T>(refs: Ref<T>[]) =>
  (newRef: T): void =>
    refs.forEach((ref) => {
      if (ref === null) {
        return
      }

      if (typeof ref === "function") {
        ref(newRef)
      } else {
        ref.current = newRef
      }
    })
