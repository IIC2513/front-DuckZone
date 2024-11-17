import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import io from "socket.io-client";

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

            socket.current.on("connect_error", (error) => {
                console.error("WebSocket connection error:", error);
                addToast("Error de conexión WebSocket", "error");
            });

            socket.current.on("game_updated", handleGameUpdated);
            socket.current.on("player_updated", handlePlayerUpdated);

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

        const handleGameUpdated = (updatedGame) => {
            if (updatedGame.id === gameId) {
                setGame(updatedGame);
                console.log('Game updated:', updatedGame);
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
            if (socket.current) {
                socket.current.off("game_updated", handleGameUpdated);
                socket.current.off("player_updated", handlePlayerUpdated);
                // No desconectamos el socket aquí
            }
        };
    }, [gameId, userPlayer, otherPlayer]); // Dependencies to re-run the effect if these change
    
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
        async function fetchGame() {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/games/${gameId}`);
                const data = await response.json();
                setGame(data);
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        }

        fetchGame();
    }, [gameId]);

    useEffect(() => {
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

        fetchPlayers();
    }, [game, userId]);

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

    useEffect(() => {
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
                console.log('Player cards:', cardIds);
            }
        }

        fetchPlayerCards();
    }, [userPlayer, game]);

    return (
        <>
            <br></br>
            <br></br>
            <div className='pantallajuego'>
                <div className="player-info left-player">
                    <div className="health-bar">
                        <div className="health-fill" style={{ height: `${otherPlayer?.health_points / 50 * 100}%` }}></div>
                    </div>
                    <div className="mana-bar">
                        <div className="mana-fill" style={{ height: `${otherPlayer?.actual_mana / 9 * 100}%` }}></div>
                    </div>
                </div>
                <div className='gameboard'>
                    <div className="row top-row">
                        <div className="card_Game"></div>
                        <div className="card_Game"></div>
                        <div className="card_Game"></div>
                        <div className="card_Game"></div>
                        <div className="card_Game"></div>
                    </div>
                    <div className="row middle-row">
                        {userPlayer?.id === game?.playerOne ? (
                            <>
                                {game?.card_2 ? (
                                    <div className={`card_Game ${cardTwoGame?.type}`}>
                                        <p className='mana'>{cardTwoGame?.mana_cost}</p>
                                        <p className='atk'>{cardTwoGame?.atk_points}</p>
                                        <p className='name'>{cardTwoGame?.name}</p>
                                    </div>
                                ) : (
                                    <div className="card_Game select"></div>
                                )}
                                {game?.card_1 ? (
                                    <div className={`card_Game ${cardOneGame?.type}`}>
                                        <p className='mana'>{cardOneGame?.mana_cost}</p>
                                        <p className='atk'>{cardOneGame?.atk_points}</p>
                                        <p className='name'>{cardOneGame?.name}</p>
                                    </div>
                                ) : (
                                    <div className="card_Game select"></div>
                                )}
                            </>
                        ) : (
                            <>
                                {game?.card_1 ? (
                                    <div className={`card_Game ${cardOneGame?.type}`}>
                                        <p className='mana'>{cardOneGame?.mana_cost}</p>
                                        <p className='atk'>{cardOneGame?.atk_points}</p>
                                        <p className='name'>{cardOneGame?.name}</p>
                                    </div>
                                ) : (
                                    <div className="card_Game select"></div>
                                )}
                                {game?.card_2 ? (
                                    <div className={`card_Game ${cardTwoGame?.type}`}>
                                        <p className='mana'>{cardTwoGame?.mana_cost}</p>
                                        <p className='atk'>{cardTwoGame?.atk_points}</p>
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
                            onClick={async () => {
                                try {
                                    const playDuckResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${userPlayer.id}/play_duck/1`, { method: 'PATCH' });
                                    if (!playDuckResponse.ok) {
                                        throw new Error('Error playing card one');
                                    }
                                    const saveCardUrl = userPlayer.id === game.playerOne 
                                        ? `${import.meta.env.VITE_BACKEND_URL}/games/save_card1/${gameId}` 
                                        : `${import.meta.env.VITE_BACKEND_URL}/games/save_card2/${gameId}`;
                                    await fetch(saveCardUrl, {
                                        method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ cardId: cardOne.id }),
                                    });
                                } catch (error) {
                                    console.error('Error playing card one:', error);
                                }
                            }}
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
                            onClick={async () => {
                                try {
                                    const playDuckResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${userPlayer.id}/play_duck/2`, { method: 'PATCH' });
                                    if (!playDuckResponse.ok) {
                                        throw new Error('Error playing card two');
                                    }
                                    const saveCardUrl = userPlayer.id === game.playerOne 
                                        ? `${import.meta.env.VITE_BACKEND_URL}/games/save_card1/${gameId}` 
                                        : `${import.meta.env.VITE_BACKEND_URL}/games/save_card2/${gameId}`;
                                    await fetch(saveCardUrl, {
                                        method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ cardId: cardTwo.id }),
                                    });
                                } catch (error) {
                                    console.error('Error playing card two:', error);
                                }
                            }}
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
                            onClick={async () => {
                                try {
                                    const playDuckResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${userPlayer.id}/play_duck/3`, { method: 'PATCH' });
                                    if (!playDuckResponse.ok) {
                                        throw new Error('Error playing card three');
                                    }
                                    const saveCardUrl = userPlayer.id === game.playerOne 
                                        ? `${import.meta.env.VITE_BACKEND_URL}/games/save_card1/${gameId}` 
                                        : `${import.meta.env.VITE_BACKEND_URL}/games/save_card2/${gameId}`;
                                    await fetch(saveCardUrl, {
                                        method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ cardId: cardThree.id }),
                                    });
                                } catch (error) {
                                    console.error('Error playing card three:', error);
                                }
                            }}
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
                            onClick={async () => {
                                try {
                                    const playDuckResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${userPlayer.id}/play_duck/4`, { method: 'PATCH' });
                                    if (!playDuckResponse.ok) {
                                        throw new Error('Error playing card four');
                                    }
                                    const saveCardUrl = userPlayer.id === game.playerOne 
                                        ? `${import.meta.env.VITE_BACKEND_URL}/games/save_card1/${gameId}` 
                                        : `${import.meta.env.VITE_BACKEND_URL}/games/save_card2/${gameId}`;
                                    await fetch(saveCardUrl, {
                                        method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ cardId: cardFour.id }),
                                    });
                                } catch (error) {
                                    console.error('Error playing card four:', error);
                                }
                            }}
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
                            onClick={async () => {
                                try {
                                    const playDuckResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${userPlayer.id}/play_duck/5`, { method: 'PATCH' });
                                    if (!playDuckResponse.ok) {
                                        throw new Error('Error playing card five');
                                    }
                                    const saveCardUrl = userPlayer.id === game.playerOne 
                                        ? `${import.meta.env.VITE_BACKEND_URL}/games/save_card1/${gameId}` 
                                        : `${import.meta.env.VITE_BACKEND_URL}/games/save_card2/${gameId}`;
                                    await fetch(saveCardUrl, {
                                        method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ cardId: cardFive.id }),
                                    });
                                } catch (error) {
                                    console.error('Error playing card five:', error);
                                }
                            }}
                        >
                            <p className='mana'>{cardFive.mana_cost}</p>
                            <p className='atk'>{cardFive.atk_points}</p>
                            <p className='name'>{cardFive.name}</p>
                        </div>
                        )}
                        {!cardFive && <div className="card_Game"></div>}
                    </div>
                </div>
                <div className="player-info right-player">
                    <div className="health-bar">
                        <div className="health-fill" style={{ height: `${userPlayer?.health_points / 50 * 100}%` }}></div>
                    </div>
                    <div className="mana-bar">
                        <div className="mana-fill" style={{ height: `${userPlayer?.actual_mana / 9 * 100}%` }}></div>
                    </div>
                </div>
                </div>    
                <br/>
                <div className="player-count">
                    <p>Players: {game?.player_count}/2</p>
                </div>
                {userPlayer?.id === game?.playerOne && game?.started === false && (
                <button onClick={async () => {
                    try {
                        await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${userPlayer.id}/refill_hand`, { method: 'PATCH' });
                        await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${otherPlayer.id}/refill_hand`, { method: 'PATCH' });
                        await fetch(`${import.meta.env.VITE_BACKEND_URL}/games/start/${gameId}`, { method: 'PATCH' });
                        console.log('Hand refilled for both players');
                    } catch (error) {
                        console.error('Error refilling hand:', error);
                    }
                }} disabled={game?.player_count !== 2}>Comenzar Partida</button>
                )}
            </>
        );
    }

export default GameBoard;