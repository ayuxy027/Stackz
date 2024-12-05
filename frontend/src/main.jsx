import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react';


const queryClient = new QueryClient()

const manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <TonConnectUIProvider manifestUrl={manifestUrl}>

      <BrowserRouter>
        <App />
      </BrowserRouter>
      </TonConnectUIProvider>

    </QueryClientProvider>

  </React.StrictMode>,
)


