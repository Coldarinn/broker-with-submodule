import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Router } from "./Router"
import "normalize.css"
import "./global.css"
import { UserProvider } from "./modules/user"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <UserProvider>
          <Router />
        </UserProvider>
      </DndProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
