import ReactDOM from "react-dom/client"
import { persistor, store } from "./store/store"
import { BrowserRouter } from "react-router-dom"
import { Provider as ReduxProvider } from "react-redux"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { PersistGate } from "redux-persist/integration/react"

import "./App.css"
import "./index.css"
import App from "./App"
import "simplebar/src/simplebar.css"
import "./assets/third-party/apex-chart.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID || ""}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </PersistGate>
  </ReduxProvider>
)
