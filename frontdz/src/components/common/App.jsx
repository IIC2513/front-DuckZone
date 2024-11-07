import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import pato1 from '../../assets/imgs/pato1.png'
import pato2 from '../../assets/imgs/pato2.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>¡Bienvenido a DuckZone!</h1>
      <button className='jugarboton'>JUGUEMOS</button>
      <br></br>
      <img src={pato1} className='patito1'></img>
      <img src={pato2} className='patito2'></img>
      <p className="read-the-docs">
        Hola q bueno q estes bien :)
      </p>
    </>
  )
}

export default App
