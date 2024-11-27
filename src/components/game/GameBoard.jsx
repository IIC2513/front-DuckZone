import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { flushSync } from 'react-dom';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import io from 'socket.io-client';

function GameBoard() {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const gameId = parseInt(id, 10);
  const [game, setGame] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userPlayer, setUserPlayer] = useState(null);
  const [otherPlayer, setOtherPlayer] = useState(null);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [cardThree, setCardThree] = useState(null);
  const [cardFour, setCardFour] = useState(null);
  const [cardFive, setCardFive] = useState(null);
  const [cardOneGame, setCardOneGame] = useState(null);
  const [cardTwoGame, setCardTwoGame] = useState(null);
  const [cardsBlocked, setCardsBlocked] = useState(false);
  const [played, setPlayed] = useState(false);
  const socket = useRef(null);
  
  const config = {
    method: 'get',
    url: `${import.meta.env.VITE_BACKEND_URL}/scope-example/protecteduser`,
    headers: { 'Authorization': `Bearer ${token}` },
  };

  // Connect to the socket server
  useEffect(() => {
    const connectSocket = () => {
      socket.current = io(import.meta.env.VITE_BACKEND_URL, {
        transports: ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socket.current.on("game_updated", handleGameUpdated);
      socket.current.on("player_updated", handlePlayerUpdated);
      socket.current.on("player_disconnect", handleDisconnect);

      socket.current.on("disconnect", () => console.warn("WebSocket disconnected. Attempting to reconnect..."));
      socket.current.on("reconnect_failed", () => console.error("WebSocket reconnection failed."));
    };

    connectSocket();

    return () => {
      if (socket.current) {
        socket.current.off("game_updated", handleGameUpdated);
        socket.current.off("player_updated", handlePlayerUpdated);
        socket.current.off("player_disconnect", handleDisconnect);
      }
    };
  }, [gameId, userPlayer, otherPlayer]);

  // Handle game updates
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

  const handleDisconnect = async () => {
    if (userPlayer) {
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/games/winbywalkover/${gameId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ playerId: userPlayer.id }),
        });
      } catch (error) {
        console.error('Error handling disconnect:', error);
      }
    }
  };

  // Fetch game data
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/games/${gameId}`);
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };
    fetchGame();
  }, [gameId]);

  // Fetch players data
  useEffect(() => {
    const fetchPlayers = async () => {
      if (game) {
        try {
          const playerOneResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${game.playerOne}`);
          const playerOneData = await playerOneResponse.json();
          const playerTwoResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${game.playerTwo}`);
          const playerTwoData = await playerTwoResponse.json();
          if (playerOneData.userId === userId) {
            setUserPlayer(playerOneData);
            setOtherPlayer(playerTwoData);
          } else if (playerTwoData.userId === userId) {
            setUserPlayer(playerTwoData);
            setOtherPlayer(playerOneData);
          }
        } catch (error) {
          console.error('Error fetching players data:', error);
        }
      }
    };
    fetchPlayers();
  }, [game, userId]);

  // Handle card fetching for the player
  const fetchCard = async (cardId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cards/${cardId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching card data:', error);
      return null;
    }
  };

  // Fetch the player's cards
  useEffect(() => {
    const fetchPlayerCards = async () => {
      if (userPlayer) {
        const cardIds = [
          userPlayer.cardOneId, userPlayer.cardTwoId,
          userPlayer.cardThreeId, userPlayer.cardFourId,
          userPlayer.cardFiveId, game.card_1, game.card_2
        ];
        
        const cards = await Promise.all(cardIds.map(cardId => cardId ? fetchCard(cardId) : null));
        setCardOne(cards[0]);
        setCardTwo(cards[1]);
        setCardThree(cards[2]);
        setCardFour(cards[3]);
        setCardFive(cards[4]);
        setCardOneGame(cards[5]);
        setCardTwoGame(cards[6]);
      }
    };
    if (userPlayer) fetchPlayerCards();
  }, [userPlayer, game]);

  // Actions for playing a card or skipping turn
  const handleCardClick = async (card, cardIndex) => {
    if (cardsBlocked || played) return;

    setPlayed(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${userPlayer.id}/play_duck/${cardIndex}`, { method: 'PATCH' });
      if (!response.ok) throw new Error(`Error playing card ${cardIndex}`);
      const saveCardUrl = userPlayer.id === game.playerOne
        ? `${import.meta.env.VITE_BACKEND_URL}/games/save_card1/${gameId}`
        : `${import.meta.env.VITE_BACKEND_URL}/games/save_card2/${gameId}`;
      await fetch(saveCardUrl, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: card.id }),
      });
    } catch (error) {
      setPlayed(false);
      console.error(`Error playing card ${cardIndex}:`, error);
    }
  };

  const handleSkipTurn = async () => {
    if (cardsBlocked || played) return;

    setPlayed(true);
    try {
      if (game.started === false) throw new Error('Game not started');

      const playDuckResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${userPlayer.id}/play_duck/6`, { method: 'PATCH' });
      if (!playDuckResponse.ok) throw new Error('Error skipping turn');

      const saveCardUrl = userPlayer.id === game.playerOne
        ? `${import.meta.env.VITE_BACKEND_URL}/games/save_card1/${gameId}`
        : `${import.meta.env.VITE_BACKEND_URL}/games/save_card2/${gameId}`;

      await fetch(saveCardUrl, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: 26 }),
      });
    } catch (error) {
      setPlayed(false);
      console.error('Error skipping turn:', error);
    }
  };


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
                    <p className='elementouuu'>Players: {game?.player_count}/2</p>
                    {game?.started && <a href={`/newreport/${game?.id}`} className='elementouuu'>Reportar oponente</a>}
                </div>
                {userPlayer?.id === game?.playerOne && game?.started === false && (
                <button onClick={startGame} disabled={game?.player_count !== 2}>Comenzar Partida</button>
                )}
            </>
        );
    }

export default GameBoard;
    