import {Provider} from 'react-redux'
import { persistor, store } from './lib/redux/Store.ts'
import {useRoutes} from 'react-router-dom'
import { adminRouters } from './routers/router.tsx'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  const adminRoutes = useRoutes(adminRouters)
  return (
    {adminRoutes}
  )
}

export default App
