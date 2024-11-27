import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { flushSync } from 'react-dom';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import io from "socket.io-client";
import ReactDOM from "react-dom/client";


function GameBoard() {

    const { token } = useContext(AuthContext)
    const { id } = useParams();
    const gameId = parseInt(id, 10);
    const [game, setGame] = React.useState(null);
    const [userId, setUserId] = useState(null);
    const [msg, setMsg] = useState("");
    const [userPlayer, setUserPlayer] = React.useState(null);
    const [otherPlayer, setOtherPlayer] = React.useState(null);
    const [cardOne, setCardOne] = React.useState(null);
    const [cardTwo, setCardTwo] = React.useState(null);
    const [cardThree, setCardThree] = React.useState(null);
    const [cardFour, setCardFour] = React.useState(null);
    const [cardFive, setCardFive] = React.useState(null);
    const [cardOneGame, setCardOneGame] = React.useState(null);
    const [cardTwoGame, setCardTwoGame] = React.useState(null);
    const [cardsBlocked, setCardsBlocked] = React.useState(false);
    const [played, setPlayed] = React.useState(false);
    const socket = useRef(null);
    const config = {
        method: 'get',
        url: `${import.meta.env.VITE_BACKEND_URL}/scope-example/protecteduser`,
        headers: { 
          'Authorization': `Bearer ${token}`,
        }
    };

    useEffect(() => {
        const connectSocket = () => {
            socket.current = io(import.meta.env.VITE_BACKEND_URL, {
                transports: ['websocket'],
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
            });

            socket.current.on("connection_error", (err) => {
                console.log(err.req);      // the request object
                console.log(err.code);     // the error code, for example 1
                console.log(err.message);  // the error message, for example "Session ID unknown"
                console.log(err.context);  // some additional error context
              });

            socket.current.on("connect_error", (error) => {
                console.error("WebSocket connection error:", error);
                // addToast("Error de conexión WebSocket", "error");
            });

            socket.current.on("game_updated", handleGameUpdated);
            socket.current.on("player_updated", handlePlayerUpdated);
            socket.current.on("player_disconnect", handleDisconnect);

            socket.current.on("disconnect", () => {
                console.warn("WebSocket disconnected. Attempting to reconnect...");
            });

            socket.current.on("reconnect_failed", () => {
                console.error("WebSocket reconnection failed.");
                addToast("Error de reconexión WebSocket", "error");
            });

            socket.current.on("close", (reason) => {
                if (reason === "transport close") {
                    console.warn("WebSocket closed before the connection was established.");
                }
            });
        };  

        const handleUnload = (event) => {
            handleDisconnect();
          };

        window.addEventListener('beforeunload', handleUnload);
        window.addEventListener('unload', handleUnload);

        const handleDisconnect = async () => {
            console.log("User disconnected");
            if (userPlayer) {
              try {
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/games/winbywalkover/${gameId}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ playerId: userPlayer.id }),
                });
              } catch (error) {
                console.error('Error handling disconnect:', error);
              }
            }
          };

        const handleGameUpdated = (updatedGame) => {
            if (updatedGame.id === gameId) {
                setGame(updatedGame);
            }
        };

        const handlePlayerUpdated = (updatedPlayer) => {
            if (updatedPlayer.id === userPlayer?.id) {
                setUserPlayer(updatedPlayer);
            } else if (updatedPlayer.id === otherPlayer?.id) {
                setOtherPlayer(updatedPlayer);
            }
        };

        connectSocket();

        return () => {
            // if (socket.current) {
                socket.current.off("player_disconnect", handleDisconnect);
                socket.current.off("game_updated", handleGameUpdated);
                socket.current.off("player_updated", handlePlayerUpdated);
            // }
        };
    }, [gameId, userPlayer, otherPlayer]);

    const startGame = async () => {
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${userPlayer.id}/refill_hand`, { method: 'PATCH' });
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${otherPlayer.id}/refill_hand`, { method: 'PATCH' });
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/games/start/${gameId}`, { method: 'PATCH' });
        } catch (error) {
            console.error('Error refilling hand:', error);
        }
    };

      async function fetchGame() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/games/${gameId}`);
            const data = await response.json();
            setGame(data);
        } catch (error) {
            console.error('Error fetching game data:', error);
        }
    }

    async function fetchPlayers() {
        if (game) {
            try {
                const playerOneResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${game.playerOne}`);
                const playerOneData = await playerOneResponse.json();
                const playerTwoResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${game.playerTwo}`);
                const playerTwoData = await playerTwoResponse.json();
                if (playerOneData.userId == userId) {
                    setUserPlayer(playerOneData);
                    setOtherPlayer(playerTwoData);
                } else if (playerTwoData.userId == userId) {
                    setUserPlayer(playerTwoData);
                    setOtherPlayer(playerOneData);
                }
            } catch (error) {
                console.error('Error fetching players data:', error);
            }
        }
    }

    async function fetchCard(cardId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cards/${cardId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching card data:', error);
            return null;
        }
    }

    async function fetchPlayerCards() {
        if (userPlayer) {
            const cardIds = [
                userPlayer.cardOneId,
                userPlayer.cardTwoId,
                userPlayer.cardThreeId,
                userPlayer.cardFourId,
                userPlayer.cardFiveId,
                game.card_1,
                game.card_2,
            ];

            const cardPromises = cardIds.map(cardId => cardId ? fetchCard(cardId).catch(() => null) : Promise.resolve(null));
            const cards = await Promise.all(cardPromises);

            setCardOne(cards[0]);
            setCardTwo(cards[1]);
            setCardThree(cards[2]);
            setCardFour(cards[3]);
            setCardFive(cards[4]);
            setCardOneGame(cards[5]);
            setCardTwoGame(cards[6]);
        }
    }

    async function updatePlayedCards() {
        try {

                await fetch(`${import.meta.env.VITE_BACKEND_URL}/games/updateplayedcards/${gameId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ playerId: userPlayer.id }),
            });
        } catch (error) {
            console.error('Error updating played cards:', error);
        }
    }

    async function resolveTurn() {
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/games/resolve/${gameId}`, { 
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ playerId: userPlayer.id }),
            });
        } catch (error) {
            console.error('Error resolving turn:', error);
        }
    }

    const handleCardClick = async (card, cardIndex) => {
        if (cardsBlocked || played) {
            console.log(cardsBlocked, played);
            return;
        }
        try {
            setPlayed(true);
            const playDuckResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${userPlayer.id}/play_duck/${cardIndex}`, { method: 'PATCH' });
            if (!playDuckResponse.ok) {
                throw new Error(`Error playing card ${cardIndex}`);
            }
            const saveCardUrl = userPlayer.id === game.playerOne 
                ? `${import.meta.env.VITE_BACKEND_URL}/games/save_card1/${gameId}` 
                : `${import.meta.env.VITE_BACKEND_URL}/games/save_card2/${gameId}`;
            await fetch(saveCardUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cardId: card.id }),
            });
        } catch (error) {
            setPlayed(false);
            console.error(`Error playing card ${cardIndex}:`, error);
        }
    };

    const handleSkipTurn = async () => {
        if (cardsBlocked || played) {
            console.log(cardsBlocked, played);
            return;
        }
        try {
            setPlayed(true);
            if (game.started === false) {
                throw new Error('Error skipping turn');
            }
            if (userPlayer.id === game.playerOne) {
                const playDuckResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${userPlayer.id}/play_duck/6`, { method: 'PATCH' })
                if (!playDuckResponse.ok) {
                    throw new Error('Error skipping turn');
                }
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/games/save_card1/${gameId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cardId: 26 }),
                });
            } else if (userPlayer.id === game.playerTwo) {
                const playDuckResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${userPlayer.id}/play_duck/6`, { method: 'PATCH' })
                if (!playDuckResponse.ok) {
                    throw new Error('Error skipping turn');
                }
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/games/save_card2/${gameId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cardId: 26 }),
                });
            }
        } catch (error) {
            setPlayed(false);
            console.error('Error skipping turn:', error);
        }
    };

    useEffect(() => {
        if (game?.started) {
            fetchGame();
            fetchPlayers();
            fetchPlayerCards();
        }
    }, [game?.started]);

    useEffect(() => {
        if (game?.finished) {
            fetchGame();
        }
    }, [game?.finished]);

    useEffect(() => {
        if (userPlayer) {
            document.documentElement.style.setProperty('--health-points-1', `'${userPlayer.health_points}'`);
            document.documentElement.style.setProperty('--health-points-2', `'${otherPlayer.health_points}'`);
            document.documentElement.style.setProperty('--mana-1', `'${userPlayer.actual_mana}'`);
            document.documentElement.style.setProperty('--mana-2', `'${otherPlayer.actual_mana}'`);
        }
      }, [userPlayer]);

      useEffect(() => {
        const performTurnActions = async () => {
            if (game?.card_1 && game?.card_2 && !game.updated_cards) {
                setCardsBlocked(true);  
                
                setTimeout(() => {
                    flushSync(() => {
                    setCardsBlocked(false);
                    setPlayed(false);
                    });
                }, 5500);
                setGame(prevGame => ({
                    ...prevGame,
                    updated_cards: true,
                 }));   
                await updatePlayedCards();
                await new Promise(resolve => setTimeout(resolve, 2000));
     
                if (userPlayer.id === game.playerOne) {
                    await resolveTurn();
                    await new Promise(resolve => setTimeout(resolve, 2000));
                } else {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
     
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${userPlayer.id}/refill_hand`, { method: 'PATCH' });
            }
        };
     
        performTurnActions();   
     }, [game]);
     

    useEffect(() => {
          axios(config)
              .then((response) => {
                  setMsg(response.data.message);
                  setUserId(response.data.user.sub);
              })
              .catch((error) => {
                  console.error("Invalid token");
                  console.error(error);
                  setMsg("not logged");
              });
      }, []);
             
    useEffect(() => {
        fetchGame();
    }, [gameId]);

    useEffect(() => {
        if (game) {
        fetchPlayers();
        }
    }, [game]);

    useEffect(() => {
        if (game) {
        fetchPlayerCards();
        }
    }, [userPlayer, game]);


    if (game?.finished) {
        return (
            <div className="game-finished">
                <h1>Partida Terminada</h1>
                <p>{game.winner} ha ganado.</p>
                <p>Gracias por jugar!</p>
                <a href="/">Volver al Inicio</a>
            </div>
        );
    }

    return (
        <>
            <br></br>
            <br></br>
            <div className='pantallajuego'>
                <div className="player-info left-player">
                    <div className="health-bar-2">
                        <div className="health-fill" style={{ height: `${otherPlayer?.health_points / 50 * 100}%` }}></div>
                    </div>
                </div>
                <div className='gameboard'>
                    <div className="row top-row">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="card_Game"></div>
                        ))}
                        
                    </div>
                    <div className="row middle-row">
                        {userPlayer?.id === game?.playerOne ? (
                            <>
                                {game?.card_1 && game?.card_2 ? (
                                    <div className={`card_Game ${cardTwoGame?.type}`}>
                                        <p className='mana'>{cardTwoGame?.mana_cost}</p>
                                        <p className={game?.new_damage_card_2 > cardTwoGame?.atk_points ? 'atk_blue' : 'atk'}>
                                            {game?.new_damage_card_2 ?? cardTwoGame?.atk_points}
                                        </p>
                                        <p className='name'>{cardTwoGame?.name}</p>
                                    </div>
                                ) : game?.card_2 ? (
                                    <div className="card_Game"></div>
                                ) : (
                                    <div className="card_Game select"></div>
                                )}
                                 {game?.card_1 ? (
                                    <div className={`card_Game ${cardOneGame?.type}`}>
                                        <p className='mana'>{cardOneGame?.mana_cost}</p>
                                        <p className={game?.new_damage_card_1 > cardOneGame?.atk_points ? 'atk_blue' : 'atk'}>
                                            {game?.new_damage_card_1 ?? cardOneGame?.atk_points}
                                        </p>
                                        <p className='name'>{cardOneGame?.name}</p>
                                    </div>
                                ) : (
                                    <div className="card_Game select"></div>
                                )}
                            </>
                        ) : (
                            <>
                                {game?.card_1 && game?.card_2 ? (
                                    <div className={`card_Game ${cardOneGame?.type}`}>
                                        <p className='mana'>{cardOneGame?.mana_cost}</p>
                                        <p className={game?.new_damage_card_1 > cardOneGame?.atk_points ? 'atk_blue' : 'atk'}>
                                            {game?.new_damage_card_1 ?? cardOneGame?.atk_points}
                                        </p>
                                        <p className='name'>{cardOneGame?.name}</p>
                                    </div>
                                ) : game?.card_1 ? (
                                    <div className="card_Game"></div>
                                ) : (
                                    <div className="card_Game select"></div>
                                )}
                                {game?.card_2 ? (
                                    <div className={`card_Game ${cardTwoGame?.type}`}>
                                        <p className='mana'>{cardTwoGame?.mana_cost}</p>
                                        <p className={game?.new_damage_card_2 > cardTwoGame?.atk_points ? 'atk_blue' : 'atk'}>
                                            {game?.new_damage_card_2 ?? cardTwoGame?.atk_points}
                                        </p>
                                        <p className='name'>{cardTwoGame?.name}</p>
                                    </div>
                                ) : (
                                    <div className="card_Game select"></div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="row down-row">
                        {cardOne && (
                        <div 
                            className={`card_Game selectable ${cardOne.type}`} 
                            onClick={() => handleCardClick(cardOne, 1)}
                        >
                            <p className='mana'>{cardOne.mana_cost}</p>
                            <p className='atk'>{cardOne.atk_points}</p>
                            <p className='name'>{cardOne.name}</p>
                        </div>
                        )}
                        {!cardOne && <div className="card_Game"></div>}
                        {cardTwo && (
                        <div 
                            className={`card_Game selectable ${cardTwo.type}`} 
                            onClick={() => handleCardClick(cardTwo, 2)}
                        >
                            <p className='mana'>{cardTwo.mana_cost}</p>
                            <p className='atk'>{cardTwo.atk_points}</p>
                            <p className='name'>{cardTwo.name}</p>
                        </div>
                        )}
                        {!cardTwo && <div className="card_Game"></div>}
                        {cardThree && (
                        <div 
                            className={`card_Game selectable ${cardThree.type}`} 
                            onClick={() => handleCardClick(cardThree, 3)}
                        >
                            <p className='mana'>{cardThree.mana_cost}</p>
                            <p className='atk'>{cardThree.atk_points}</p>
                            <p className='name'>{cardThree.name}</p>
                        </div>
                        )}
                        {!cardThree && <div className="card_Game"></div>}
                        {cardFour && (
                        <div 
                            className={`card_Game selectable ${cardFour.type}`} 
                            onClick={() => handleCardClick(cardFour, 4)}
                        >
                            <p className='mana'>{cardFour.mana_cost}</p>
                            <p className='atk'>{cardFour.atk_points}</p>
                            <p className='name'>{cardFour.name}</p>
                        </div>
                        )}
                        {!cardFour && <div className="card_Game"></div>}
                        {cardFive && (
                        <div 
                            className={`card_Game selectable ${cardFive.type}`} 
                            onClick={() => handleCardClick(cardFive, 5)}
                        >
                            <p className='mana'>{cardFive.mana_cost}</p>
                            <p className='atk'>{cardFive.atk_points}</p>
                            <p className='name'>{cardFive.name}</p>
                        </div>
                        )}
                        {!cardFive && <div className="card_Game"></div>}
                        {game?.started === false && ( <div className="card_Game"></div>)}
                        {game?.started  && (<div 
                            className={`card_Game selectable`} 
                            onClick={() => handleSkipTurn()}
                        >
                            <p className='mana'></p>
                            <p className='atk'></p>
                            <p className='skip_name'>Pasar de Turno</p>
                        </div>)}
                    </div>
                </div>
                <div className="player-info right-player">
                    <div className="health-bar-1">
                        <div className="health-fill" style={{ height: `${userPlayer?.health_points / 50 * 100}%`, content: `${userPlayer?.health_points}`}}></div>
                    </div>
                    <div className="mana-bar-1">
                        <div className="mana-fill" style={{ height: `${userPlayer?.actual_mana / 9 * 100}%` }}></div>
                    </div>
                </div>
                </div>    
                <br/>
                <div className="player-count">
                    <p>Players: {game?.player_count}/2</p>
                </div>
                {userPlayer?.id === game?.playerOne && game?.started === false && (
                <button onClick={startGame} disabled={game?.player_count !== 2}>Comenzar Partida</button>
                )}
            </>
        );
    }

export default GameBoard;
    