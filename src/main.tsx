import React from "react"
import ReactDOM from "react-dom/client"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

// scroll bar
import "simplebar/src/simplebar.css"

// third-party
import { Provider as ReduxProvider } from "react-redux"

// apex-chart
import "./assets/third-party/apex-chart.css"

// project import
import App from "./App"
import { store } from "./store/store"
import "./App.css"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
)
