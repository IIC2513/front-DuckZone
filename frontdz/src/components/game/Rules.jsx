import React from 'react';
import esquemaTipos from '../../assets/imgs/esquema-tipos.png';

function Rules() {
    return (
        <>
            <br></br>
            <br></br>
            <br></br>

            <h1>Reglas del Juego</h1>
            <div className='left containera'>

                <details>
                    <summary>Objetivo del Juego</summary>
                    <p>
                        El objetivo del jugador es hacer que los puntos de vida del oponente lleguen a 0. Esto 
                        se logra atacando al oponente con cartas de patos y hechizos. En cada turno un jugador 
                        tendrá que atacar con una carta de pato (lo que significa que podrá usar un hechizo si 
                        tiene alguno disponible) y el otro tendrá que defenderse con una carta de pato (no podrá 
                        usar hechizos durante el turno). 
                    </p>        
                </details>
                <details>
                    <summary>Componentes del Juego</summary>
                    <p>
                        Cada jugador tiene un mazo de cartas de patos y hechizos (el cual es el mismo para todo jugador), 
                        la mano de cartas que puede jugar el un turno se compone de 5 cartas, cada jugador tiene 50 puntos
                        de vida y puede tener hasta 9 de mana base y 3 de mana extra.
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
                                el otro, este recibe una bonificación de un 25% de daño, si es neutral, el daño es normal. El tipo
                                de los patos puede verse afectado por el uso de cartas de hechizo.
                            </p>
                        </li>
                        {/*<li>
                            <h3>Cartas de Hechizo</h3>
                            <p>
                                Las cartas de hechizo solo pueden ser usadas por el jugador atacante (en caso de tener alguna disponible).
                                Hay 2 tipos de hechizos: hechizos para agregar un tipo al pato atacante y hechizos para cambiar el tipo del
                                pato defensor.
                            </p>
                            <ul>
                                <li>
                                <h4>Hechizos de Agregación de Tipo</h4>
                                <p>
                                    Estos hechizos permiten agregar un tipo al pato atacante, esto puede ser útil para hacer más daño al oponente
                                    o para defenderse de los ataques del oponente. Estos hechizos tienen un costo de 2 de mana. Habrán situaciones
                                    donde estas cartas permitan tornar la situación a favor del atacante, situaciones donde se empareje la cancha 
                                    (por ejemplo, si el atacante tiene un tipo eficaz y un tipo poco eficaz contra el defensor, tras usar el hechizo) 
                                    y situaciones donde el atacante podría ponerse a si mismo en desventaja dada una mala elección de tipo.
                                </p>
                                </li>
                                <li>
                                <h4>Hechizos de Cambio de Tipo</h4>
                                <p>
                                    Estos hechizos permiten cambiar el tipo del pato defensor, esto puede ser útil para defenderse del contraataque
                                    del defensor o para hacer más daño al mismo. Estos hechizos tienen un costo de 3 de mana. Esta carta puede ser
                                    útil dependiendo de la elección del atacante, si elige un tipo poco eficaz contra el pato que usó para atacar,
                                    entonces su pato obtendrá el 25% de bonificación de daño, en caso contrario, el defensor obtendrá la bonificación.
                                </p>
                                </li>
                            </ul>
                        </li>*/}
                    </ul>
                </details>

                <details>
                    <summary>Desarrollo del Juego</summary>
                    <p>
                    El juego se desarrolla rondas de 2 turnos, en cada turno un jugador ataca y el otro defiende. El jugador atacante 
                    puede jugar una carta de pato y un hechizo si tiene alguno disponible, el jugador defensor puede jugar una carta de
                    pato. El jugador atacante puede decidir si atacar con un pato o no, en caso de no hacerlo, el defensor podrá
                    usar una carta de pato e inflingir daño al atacante. Es importante considerar que la posibilidad de jugar cartas
                    depende directamente del mana disponible. Un jugador siempre tendrá 5 cartas en la mano al inicio de cada ronda.
                    El mana disponible al inicio de cada ronda dependerá del mana ahorrado de la ronda anterior (que se almacena como
                    mana extra o adicional) y del mana base que se obtiene al inicio de cada ronda. El mana base que se obtiene al inicio de
                    cada ronda es inicialmente 4 y va incrementando en 1 por cada ronda que pasa, hasta llegar a 9.
                    </p>
                    <ul>
                        <li>
                        <h3>Desarrollo de una Ronda</h3>
                        <p>
                        Iniciando la ronda, se recarga el mana de cada jugador en cierta cantidad dependiendo de cual es la ronda actual.
                        El desarrollo de un turno se compone de los siguientes pasos:
                        </p>
                        <ol>
                            <li>En simultaneo, el jugador atacante y el defensor juegan una carta de pato mostradas al mismo tiempo.</li>
                            <li>Se muestran los puntos de ataque actuales dependiendo de la efectividad que tenga una carta frente a la otra.</li>
                            <li>En caso de que el atacante tenga un hechizo disponible, este puede ser jugado.</li>
                            <li>Se muestran los puntos de ataque actualizados en caso de existir un cambio en los tipos de las cartas.</li>
                            <li>Se resuelve el ataque y la defensa. La diferencia de los puntos de ataque entre los patos, se aplica como daño a 
                                la vida del jugador perdedor.</li>
                            <li>Se actualizan los puntos de vida de los jugadores.</li>
                        </ol>
                        <p>
                            Para el turno del otro jugador, se intercambian los roles. Al cambiar de ronda, se almacena el mana restante de cada jugador 
                            en su mana adicional y se recarga la mano de cada jugador. El jugador que atacó primero en la ronda anterior, defenderá primero 
                            en la siguiente y viceversa.
                        </p>
                        </li>
                    </ul>
                </details>
                <details>
                    <summary>Evento Especial</summary>
                    <p>
                    Hay un evento especial que tienen que ver con las cartas que se encuentran actualmente en la mano de un jugador. Si se da la posibilidad de que
                    algún jugador lleve a cabo la ejecución del evento especial, se dará tiempo para esto al inicio de cada ronda.
                    </p>
                    <h3>Mano con Patos de Todos los Tipos</h3>
                    <p>
                        Si un jugador tiene en su mano cartas de patos de todos los tipos, entonces el jugador podra decidir entre una bonificación 
                        de sombra de poder de ataque o una de luz, que otorgue puntos de vida (puede no usar ninguna). La bonificación de poder de 
                        ataque consiste en que las proximas 5 cartas de pato jugadas obtienen un 30% de bonificación de daño, pero el jugador 
                        sacrifica un 10% de su vida actual. La bonificación de defensa consiste en que el jugador obtiene un 30% de vida adicional
                        en relación a su vida actual, pero sacrifica un 20% del poder de ataque de las proximas 5 cartas de pato jugadas.
                    </p>
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
                    El esquema de tipos, que muestra que tipos son mas efectivos y la interacción del jugador con la bonificación de luz y la de sombra, es el siguiente:
                    </p>
                    <img src={esquemaTipos} alt="Esquema de Tipos" className='esquema'/>
                </details>

            </div>
        </>
    );
}

export default Rules;