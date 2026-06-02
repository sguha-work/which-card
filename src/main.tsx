import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { requestPersistentStorage, migrateFromLocalStorage } from './db/indexedDB'

// Bootstrap storage: migrate old localStorage data then request durable storage.
async function bootstrap() {
  // Keys used by the old localStorage implementation
  await migrateFromLocalStorage(['credit-cards'])
  await requestPersistentStorage()
}

bootstrap().catch(console.error)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
