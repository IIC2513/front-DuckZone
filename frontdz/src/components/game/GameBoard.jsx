import React, { useEffect } from 'react';

function GameBoard() {
    return (
        <>
        <br></br>
        <br></br>
        <div className='pantallajuego'>
        <div className="player-info left-player">
                    <div className="health-bar">
                        <div className="health-fill" style={{ height: '80%' }}></div>
                    </div>
                    <div className="mana-bar">
                        <div className="mana-fill" style={{ height: '60%' }}></div>
                    </div>
                </div>
            <div className='gameboard'>
                <div className="row top-row">
                    <div className="card_Game">?</div>
                    <div className="card_Game">?</div>
                    <div className="card_Game">?</div>
                    <div className="card_Game">?</div>
                    <div className="card_Game">?</div>
                </div>
                <div className="row middle-row">
                    <div className="card_Game select"> </div>
                </div>
                <div className="row down-row">
                    <div className="card_Game selectable">Carta 1</div>
                    <div className="card_Game selectable">Carta 2</div>
                    <div className="card_Game selectable">Carta 3</div>
                    <div className="card_Game selectable">Carta 4</div>
                    <div className="card_Game selectable">Carta 5</div>
                </div>
            </div>
            <div className="player-info right-player">
                <div className="health-bar">
                    <div className="health-fill" style={{ height: '70%' }}></div>
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