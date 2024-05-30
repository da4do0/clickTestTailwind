import { useState } from 'react'
import Header from './components/header/header'
import Main from './components/main/main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Main/>
    </>
  )
}

export default App
