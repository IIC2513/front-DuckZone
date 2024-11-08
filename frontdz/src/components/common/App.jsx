import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import pato1 from '../../assets/imgs/pato1.png'
import pato2 from '../../assets/imgs/pato2.png'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <div className="slick-prev">{""}</div>,
    nextArrow: <div className="slick-next">{""}</div>
  };

  return (
    <>
      <h1>¡Bienvenido a DuckZone!</h1>
      <a href='/newgame'><button className='jugarboton' href='/newgame'>JUGUEMOS</button></a>
      <br></br>
      <img src={pato1} className='patito1'></img>
      <img src={pato2} className='patito2'></img>
      <div>
        <Slider {...settings}>
          <div>
            <h3>¿Quiénes somos?</h3>
            <p className="read-the-docs">
              El equipo de duckzone está conformado por 3 amigos<br></br> desarrolladores que decidieron crear un jueguito de cartas.<br></br> Puedes ver más <a href='/'>aquí.</a>
            </p>
          </div>
          <div>
            <h3>¿Qué hacemos?</h3>
            <p className="read-the-docs">
              Creamos juegos de cartas interactivos para todas las edades.<br></br> Puedes ver más <a href='/'>aquí.</a>
            </p>
          </div>
          <div>
            <h3>¿Cómo contactarnos?</h3>
            <p className="read-the-docs">
              Puedes contactarnos a través de nuestro formulario de contacto.<br></br> Puedes ver más <a href='/'>aquí.</a>
            </p>
          </div>
        </Slider>
      </div>
    </>
  )
}

export default App
