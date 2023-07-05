import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.sass'
import { LoadContextProvider } from './context/load'
import { VipCodeContextProvider } from './context/vip-code'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VipCodeContextProvider>
      <LoadContextProvider>
        <App />
      </LoadContextProvider>
    </VipCodeContextProvider>
  </React.StrictMode>,
)
