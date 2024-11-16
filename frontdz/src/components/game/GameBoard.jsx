import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';

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
    const config = {
        method: 'get',
        url: `${import.meta.env.VITE_BACKEND_URL}/scope-example/protecteduser`,
        headers: { 
          'Authorization': `Bearer ${token}`,
        }
      };
    
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
                ];

                const validCardIds = cardIds.filter(cardId => cardId !== null && cardId !== undefined);
                const cardPromises = validCardIds.map(cardId => fetchCard(cardId));
                const cards = await Promise.all(cardPromises.map(p => p.catch(() => null)));

                setCardOne(cards[0]);
                setCardTwo(cards[1]);
                setCardThree(cards[2]);
                setCardFour(cards[3]);
                setCardFive(cards[4]);
            }
        }

        fetchPlayerCards();
    }, [userPlayer]);

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
                        <div className="card_Game select"> </div>
                        <div className="card_Game select"> </div>
                    </div>
                    <div className="row down-row">
                        {cardOne && (
                            <div className={`card_Game selectable ${cardOne.type}`}>
                                <p className='mana'>{cardOne.mana_cost}</p>
                                <p className='atk'>{cardOne.atk_points}</p>
                                <p className='name'>{cardOne.name} </p>
                            </div>
                        )}
                        {!cardOne && <div className="card_Game"></div>}
                        {cardTwo && (
                            <div className={`card_Game selectable ${cardTwo.type}`}>
                                <p className='mana'>{cardTwo.mana_cost}</p>
                                <p className='atk'>{cardTwo.atk_points}</p>
                                <p className='name'>{cardTwo.name} </p>
                                
                            </div>
                        )}
                        {!cardTwo && <div className="card_Game"></div>}
                        {cardThree && (
                            <div className={`card_Game selectable ${cardThree.type}`}>
                                <p className='mana'>{cardThree.mana_cost}</p>
                                <p className='atk'>{cardThree.atk_points}</p>
                                <p className='name'>{cardThree.name} </p>
                            </div>
                        )}
                        {!cardThree && <div className="card_Game"></div>}
                        {cardFour && (
                            <div className={`card_Game selectable ${cardFour.type}`}>
                                <p className='mana'>{cardFour.mana_cost}</p>
                                <p className='atk'>{cardFour.atk_points}</p>
                                <p className='name'>{cardFour.name} </p>
                            </div>
                        )}
                        {!cardFour && <div className="card_Game"></div>}
                        {cardFive && (
                            <div className={`card_Game selectable ${cardFive.type}`}>
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
                        <div className="mana-fill" style={{ height: `${otherPlayer?.actual_mana / 9 * 100}%` }}></div>
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