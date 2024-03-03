import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {NextUIProvider} from '@nextui-org/react'
import { BrowserRouter } from "react-router-dom"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <NextUIProvider className="dark text-foreground bg-background">
      <App/>
    </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
