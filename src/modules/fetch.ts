const defaultInit: RequestInit = {
  method: "GET",
  credentials: "include",
}

export const customFetch: typeof window.fetch = async (url, init) => {
  const userData = JSON.parse(
    localStorage.getItem("userData") ?? JSON.stringify({}),
  )

  const modifiedInit = { ...init }

  if (
    typeof modifiedInit.body === "object" &&
    !(modifiedInit.body instanceof FormData)
  ) {
    modifiedInit.headers = {
      ...modifiedInit.headers,
      "Content-Type": "application/json",
    }
    modifiedInit.body = JSON.stringify(modifiedInit.body)
  }

  if (userData.accessToken) {
    modifiedInit.headers = {
      ...modifiedInit.headers,
      Authorization: `Bearer ${userData.accessToken}`,
    }
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
    ...defaultInit,
    ...modifiedInit,
  })

  if (response.status === 401) {
    localStorage.removeItem("userData")
    window.location.href = "/login"
  }

  return response
}
