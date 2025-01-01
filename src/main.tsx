import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { EventProvider } from './Context/EventContext'

createRoot(document.getElementById('root')!).render(
  <EventProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </EventProvider>
)
