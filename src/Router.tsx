import { Routes, Route, useNavigate } from "react-router-dom"
import { Login } from "@/screens/Login"
import { SignUp } from "@/screens/SignUp"
import { Home } from "./screens/Home"
import React from "react"
import { useUser } from "./modules/user"

export const Router = () => {
  const { state } = useUser()

  return (
    <Routes>
      {state.accessToken ?
        <Route path="/" element={<Home />} />
      : <>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </>
      }
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}

const NoMatch = () => {
  const { state } = useUser()
  const navigate = useNavigate()

  React.useEffect(() => {
    navigate(state.accessToken ? "/" : "/login")
  }, [])

  return null
}
