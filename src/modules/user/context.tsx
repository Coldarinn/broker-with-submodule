import React from "react"
import { User } from "./types"

export const initialData: User = {
  name: "",
  email: "",
  phone: "",
  accountType: "account_type_broker",
  company: "",
  role: "app_user",
  accessToken: "",
  refreshToken: "",
}

const initialState: User =
  JSON.parse(localStorage.getItem("userData") || "null") || initialData

type ActionType = { type: "SET_USER_DATA"; payload: User }

const UserContext = React.createContext<{
  state: User
  dispatch: React.Dispatch<ActionType>
}>({
  state: initialState,
  dispatch: () => null,
})

const userReducer = (state: User, action: ActionType): User => {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const { state, dispatch } = React.useContext(UserContext)

  if (!state) {
    throw new Error("useUser must be used within a UserProvider")
  }

  const setUser = (userData: User) => {
    dispatch({ type: "SET_USER_DATA", payload: userData })
  }

  return { state, setUser }
}
