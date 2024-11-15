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
                            <div className="card_Game selectable">
                                {cardOne.name} Mana Cost: {cardOne.mana_cost !== undefined ? cardOne.mana_cost : 'N/A'} {cardOne.spell_class ? '' : `ATK Points: ${cardOne.atk_points || 'N/A'}`} Type: {cardOne.type || 'N/A'}
                            </div>
                        )}
                        {cardTwo && (
                            <div className="card_Game selectable">
                                {cardTwo.name} Mana Cost: {cardTwo.mana_cost !== undefined ? cardTwo.mana_cost : 'N/A'} {cardTwo.spell_class ? '' : `ATK Points: ${cardTwo.atk_points || 'N/A'}`} Type: {cardTwo.type || 'N/A'}
                            </div>
                        )}
                        {cardThree && (
                            <div className="card_Game selectable">
                                {cardThree.name} Mana Cost: {cardThree.mana_cost !== undefined ? cardThree.mana_cost : 'N/A'} {cardThree.spell_class ? '' : `ATK Points: ${cardThree.atk_points || 'N/A'}`} Type: {cardThree.type || 'N/A'}
                            </div>
                        )}
                        {cardFour && (
                            <div className="card_Game selectable">
                                {cardFour.name} Mana Cost: {cardFour.mana_cost !== undefined ? cardFour.mana_cost : 'N/A'} {cardFour.spell_class ? '' : `ATK Points: ${cardFour.atk_points || 'N/A'}`} Type: {cardFour.type || 'N/A'}
                            </div>
                        )}
                        {cardFive && (
                            <div className="card_Game selectable">
                                {cardFive.name} Mana Cost: {cardFive.mana_cost !== undefined ? cardFive.mana_cost : 'N/A'} {cardFive.spell_class ? '' : `ATK Points: ${cardFive.atk_points || 'N/A'}`} Type: {cardFive.type || 'N/A'}
                            </div>
                        )}
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
        </>
    );
    }

export default GameBoard;