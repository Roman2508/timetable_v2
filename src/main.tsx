import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import { persistor, store } from './store/store'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import './App.css'
import './index.css'
import App from './App'
import 'simplebar/src/simplebar.css'
import './assets/third-party/apex-chart.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </ReduxProvider>
  // </React.StrictMode>
)
