import React from 'react';
import esquemaTipos from '../../assets/imgs/esquema-tipos.png';

function Rules() {
    return (
        <>
            <br></br>
            <br></br>
            <br></br>

            <h1>Reglas del Juego</h1>
            <div className='left'>

                <details>
                    <summary>Objetivo del Juego</summary>
                    <p>
                        El objetivo del jugador es hacer que los puntos de vida del oponente lleguen a 0. Esto 
                        se logra atacando al oponente con cartas de patos. En cada turno los jugadores
                        tendrán que atacarse con una carta de pato elemental. 
                    </p>        
                </details>
                <details>
                    <summary>Componentes del Juego</summary>
                    <p>
                        Cada jugador tiene un mazo de cartas de patos (el cual es el mismo para todo jugador), 
                        la mano de cartas que puede jugar en un turno se compone de 5 cartas, cada jugador tiene 50 puntos
                        de vida y puede tener hasta 9 de mana base.
                    </p>
                    <ul>
                        <li>
                            <h3>Cartas de Pato</h3>
                            <p>
                                Las cartas de pato son cartas que se pueden jugar para atacar al oponente o defenderse de los
                                ataques del oponente. Cada carta de pato tiene un costo de mana, un poder de ataque y un tipo
                                asociado, estos tipos son: tierra, aire, agua, hielo y fuego. Los patos pueden ser más fuertes
                                o más débiles dependiendo de su tipo y del tipo del oponente. Cuando un pato ataca a otro pato,
                                se revisa la tabla de tipos para determinar el daño que se hace. Cuando un pato es eficaz contra
                                el otro, este recibe una bonificación de un 25% de daño, si es neutral, el daño es normal.
                            </p>
                        </li>
                    </ul>
                </details>

                <details>
                    <summary>Desarrollo del Juego</summary>
                    <p>
                        El juego se desarrolla en rondas de turnos, en cada turno ambos jugadores eligen una carta de pato simultáneamente. 
                        Una vez que ambos jugadores han elegido su carta, se revelan las cartas de ambos jugadores. No hay turnos de ataque y defensa, 
                        ambos jugadores atacan y defienden al mismo tiempo. Es importante considerar que la posibilidad de jugar cartas depende directamente 
                        del mana disponible. Un jugador siempre tendrá 5 cartas en la mano al inicio de cada ronda. El mana disponible al inicio de cada ronda 
                        es inicialmente 4 y va incrementando en 1 por cada dos rondas que pasan, hasta llegar a 9.
                    </p>
                    <ul>
                        <li>
                        <h3>Desarrollo de una Ronda</h3>
                        <p>
                        Iniciando la ronda, se recarga el mana de cada jugador en cierta cantidad dependiendo de cual es la ronda actual.
                        El desarrollo de un turno se compone de los siguientes pasos:
                        </p>
                        <ol>
                            <li>En simultáneo, ambos jugadores juegan una carta de pato mostradas al mismo tiempo.</li>
                            <li>Se muestran los puntos de ataque actuales dependiendo de la efectividad que tenga una carta frente a la otra.</li>
                            <li>Se resuelve el ataque y la defensa. La diferencia de los puntos de ataque entre los patos, se aplica como daño a 
                                la vida del jugador con menor ataque.</li>
                            <li>Se actualizan los puntos de vida de los jugadores.</li>
                        </ol>
                        <p>
                            Al cambiar de ronda, se almacena el mana restante de cada jugador en su mana adicional y se recarga la mano de cada jugador. 
                            El mana disponible al inicio de cada ronda es inicialmente 4 y va incrementando en 1 por cada ronda que pasa, hasta llegar a 9.
                        </p>
                        </li>
                    </ul>
                </details>
                <details>
                    <summary>Fin del Juego</summary>
                    <p>
                    El juego termina cuando los puntos de vida de un jugador llegan a 0. En ese momento, el jugador que tiene 0 puntos de vida es el perdedor 
                    y el otro jugador es el ganador. Los puntos de vida restantes del ganador influyen directamente en las monedas que obtiene al finalizar la
                    partida.
                    </p>
                </details>
                <details>
                    <summary>Esquema de Tipos</summary>
                    <p>
                    El esquema de tipos, que muestra que tipos son más efectivos, es el siguiente:
                    </p>
                    <img src={esquemaTipos} alt="Esquema de Tipos" className='esquema'/>
                </details>

            </div>
        </>
    );
}

export default Rules;
