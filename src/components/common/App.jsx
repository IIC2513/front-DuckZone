import { useState } from 'react'
import pato1 from '../../assets/imgs/pato1.png'
import pato2 from '../../assets/imgs/pato2.png'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './App.css';

function App() {

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
      <a href='/games'><button className='jugarboton' href='/games'>JUGUEMOS</button></a>
      <br></br>
      <img src={pato1} className='patito1'></img>
      <img src={pato2} className='patito2'></img>
      <div>
        <Slider {...settings}>
          <div>
            <h3>¿Quiénes somos?</h3>
            <p className="read-the-docs">
              El equipo de duckzone está conformado por 3 amigos<br></br> desarrolladores que decidieron crear un jueguito de cartas.<br></br> Puedes ver más <a href='/about-us'>aquí.</a>
            </p>
          </div>
          <div>
            <h3>¿Para qué?</h3>
            <p className="read-the-docs">
            El propósito de DuckZone es que sus jugadores<br></br> puedan tener un espacio de ocio libre y sin prejuicios<br></br> con tal de pasar el rato, disfrutar con amigos, entre otros.
            </p>
          </div>
          <div>
            <h3>¿De qué trata?</h3>
            <p className="read-the-docs">
              Duckzone es un juego estratégico de cartas<br></br>Sus partidas se basan en jugar cartas e ir restando vida al oponente<br></br> Puedes ver más de la jugabilidad <a href='/rules'>aquí.</a>
            </p>
          </div>
        </Slider>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  )
}

export default App
