import React, { useEffect, useState } from 'react';
import numb1 from '../../images/numb1.jpg'
import numb2 from '../../images/numb2.jpg'
import numb3 from '../../images/numb3.jpg'
import numb4 from '../../images/numb4.jpg'
import numb5 from '../../images/numb5.jpg'
import numb6 from '../../images/numb6.jpg'

import '../Game/game.css'

const Game = () => {
    const [round, setRound] = useState(1)
    const [score, setScore] = useState(0)
    const [currentNumber, setCurrentNumber] = useState(0)

    const [inputValue, setInputValue] = useState(null)
    const [submittedValue, setSubmittedValue] = useState('Player 1')
    const [pointsScored, setPointsScored] = useState(0)
    const [storageData, setStorageData] = useState(null)
    const [switcherForEffect, setSwitcherForEffect] = useState(true)

    useEffect(() => {
        generateNumbers();
    }, [])

    const generateNumbers = () => {
        setCurrentNumber(Math.floor(Math.random() * 6) + 1);
    };

    const gameIcon = () => {
        if(currentNumber === 1) {
            return numb1
        } if (currentNumber === 2){
            return numb2
        } if(currentNumber === 3) {
            return numb3
        } if (currentNumber === 4){
            return numb4
        } if(currentNumber === 5) {
            return numb5
        } else {
            return numb6
        }
    }

    const handleOption = (option) => {
        const newNumber = Math.floor(Math.random() * 6) + 1;

        if (
            (option === 'bigger' && newNumber > currentNumber) ||
            (option === 'lower' && newNumber < currentNumber) ||
            (option === 'same' && newNumber === currentNumber)
          ) {
            setScore((prevScore) => prevScore + 1);
          }

        setCurrentNumber(newNumber);

        if (round === 10) {
            alert(`Game over! You score: ${score}`)
            setPointsScored(score)
            setScore(0)
            setRound(1)
            setSwitcherForEffect(!switcherForEffect)
        } else {
            setRound(round + 1);
        }
    }

    const inputData = (event) => {
        setInputValue(event.target.value);
    };

    const submitedData = (event) => {
        event.preventDefault();
        setSubmittedValue(inputValue);
        setInputValue('');
    };

    useEffect(() => {
        localStorage.setItem(`${submittedValue}`, pointsScored);
        setSubmittedValue('Player 1');
        setInputValue('')
    }, [pointsScored]);

    useEffect(() => {
        const storedData = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const value = localStorage.getItem(key);
          storedData[key] = value;
        }
        setStorageData(storedData);
      }, [switcherForEffect]);
    
    return (
        <div>
            <form className='starter' onSubmit={submitedData}>
                <input type='text' placeholder='Enter your nickname' value={inputValue} onChange={inputData}/>
                <button className='start-btn' type='submit'>Click to start game</button>
            </form>
            <div>
                {submittedValue === 'Player 1' ? <div style={{'color': 'red', 'fontWeight':'bold'}}>Enter your nickname and start game!</div> : 
                <div>
                    <h1>Round: {round}!</h1>
                    <h2>{submittedValue}, make your choise...</h2>
                        <img src={gameIcon()} alt='one'/>
                <div>
                    <button onClick={() => handleOption('bigger')}>Bigger number</button>
                    <button onClick={() => handleOption('lower')}>Lower number</button>
                    <button onClick={() => handleOption('same')}>Same number</button>
                </div>
                    <h2>Your score: {score}</h2>
                    <div>{storageData === null ? <div>Waiting for data...</div> : 
                        <div>
                            {Object.entries(storageData).map(([key, value]) => {
                                return <div>
                                            <div>{key} : {value}</div>
                                        </div>
                            })}
                        </div>}</div>
                </div>
                
                }
            </div>

        </div>
    );
};

export default Game;