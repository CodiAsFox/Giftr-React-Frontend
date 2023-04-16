import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App/App'
import './index.css'
import { TokenProvider } from './context/TokenContext'
import { GiftrProvider } from './context/GiftrContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TokenProvider>
    <GiftrProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </GiftrProvider>
  </TokenProvider>
)
