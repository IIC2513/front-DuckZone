import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function GameBoard() {


    const { id } = useParams();
    const gameId = parseInt(id, 10);
    const [game, setGame] = React.useState(null);
    const [playerOne, setPlayerOne] = React.useState(null);
    const [cardOne, setCardOne] = React.useState(null);
    const [cardTwo, setCardTwo] = React.useState(null);
    const [cardThree, setCardThree] = React.useState(null);
    const [cardFour, setCardFour] = React.useState(null);
    const [cardFive, setCardFive] = React.useState(null);

    useEffect(() => {
        console.log('Game ID:', gameId);
    }, [gameId]);


    useEffect(() => {
        async function fetchGame() {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/games/${gameId}`);
                const data = await response.json();
                console.log('Game data:', data);
                setGame(data);
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        }

        fetchGame();
    }, [gameId]);

    const playerOneId = game?.playerOne;

    useEffect(() => {
        async function fetchPlayerOne() {
            if (playerOneId) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/${playerOneId}`);
                    const data = await response.json();
                    console.log('Player One data:', data);
                    setPlayerOne(data);
                } catch (error) {
                    console.error('Error fetching player one data:', error);
                }
            }
        }

        fetchPlayerOne();
    }, [playerOneId]);

    async function fetchCard(cardId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cards/${cardId}`);
            const data = await response.json();
            console.log('Card data:', data);
            return data;
        } catch (error) {
            console.error('Error fetching card data:', error);
            return null;
        }
    }

    useEffect(() => {
        async function fetchPlayerCards() {
            if (playerOne) {
                const cardIds = [
                    playerOne.cardOneId,
                    playerOne.cardTwoId,
                    playerOne.cardThreeId,
                    playerOne.cardFourId,
                    playerOne.cardFiveId,
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
    }, [playerOne]);



    return (
        <>
            <br></br>
            <br></br>
            <div className='pantallajuego'>
                <div className="player-info left-player">
                    <div className="health-bar">
                        <div className="health-fill" style={{ height: `${playerOne?.health_points / 50}` }}></div>
                    </div>
                    <div className="mana-bar">
                        <div className="mana-fill" style={{ height: '60%' }}></div>
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
                        <div className="health-fill" style={{ height: `${playerOne?.health_points / 50}` }}></div>
                    </div>
                    <div className="mana-bar">
                        <div className="mana-fill" style={{ height: '50%' }}></div>
                    </div>
                </div>
            </div>    
        </>
    );
    }

export default GameBoard;