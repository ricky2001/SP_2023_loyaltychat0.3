import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Base  from './layouts/base'
import LandingPage from './pages/LandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Base>
    <LandingPage/>
    </Base>


    </>
  )
}

export default App
