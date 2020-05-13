import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import './index.css';

//The comments contain some of my notes I took while learning React with the
//React tutorials on PluralSight https://www.pluralsight.com/paths/react
//I don't own this code

//display all stars here
//key for dynamic child
const StarsDisplay = props => (
    <>
    {utils.range(1, props.count).map(starId =>
            <div key={starId} className="star" />
     )}
    </>
);

//DO not name your components with Number!! it's a reserved keyword
//tip: name components with two words to avoid overriding top level javascript objects
//click handler fxn closes over the scope of its owner and gets access to its props
//rmb to refresh scope of closure when needed
//see jscomplete.com/closures for more info

//a number button
const PlayNumber = props => (
    <button
        className="number"
        style={{ backgroundColor: colors[props.status] }}
        onClick={() => props.onClick(props.number, props.status)}
    >
        {props.number}
    </button>
);

const PlayAgain = props => (
    <div className="game-done">
        <div className="message"
            style={{color: props.gameStatus === 'lost' ? 'red' : 'green' }}
        >
            {props.gameStatus === 'lost' ? 'Game Over' : 'You Win!'}
        </div>
        <button onClick={props.onClick}>Play Again</button>
    </div>

);

//Custom Hook. contains state logic for game
//stateful function -> by convention, prefix function name with 'use'
//Rule of hooks: always use the react hooks function in the same order. Can't call them in loops/conditions
const useGameState = () => {
    //Tip: for first draft, if you have UI elements that change, it's good to start by adding a state
    const [stars, setStars] = useState(utils.random(1, 9)); //state hook
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9)); //Tip: use mock data to test UI
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);
    
    //avoid for/while loops if you can. map/filter/reduce are more elegant and flexible
    //minimize stuff in states as much as possible. Calculate other values if needed

    //Add side effects
    //Runs every time the owner component renders itself
    useEffect(() => {
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {  //call a new timer
                setSecondsLeft(secondsLeft - 1); //sets state. will re-render. makes a loop
            }, 1000);

            //"clean" side effect when it's no longer needed
            return () => clearTimeout(timerId); //delete timer
            //Bug in tutorial: timer 'stops' if you click on a number repeatedly
        }
    });

    //set state whenever button is clicked
    const setGameState = (newCandidateNums) => {
        if (utils.sum(newCandidateNums) !== stars) { //wrong answer
            setCandidateNums(newCandidateNums);
        } else { //correct choice. reset available and candidate nums, redraw stars
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n)
            );

            //only redraw a playable number of stars
            setStars(utils.randomSumIn(newAvailableNums, 9));

            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    }

    //Game component needs stars, availableNums, candidateNums, secondsLeft, access to setGameState
    return {
        stars,
        availableNums,
        candidateNums,
        secondsLeft,
        setGameState,
    };
}


const Game = (props) => {
    //destructure elements needed from game state
    const {
        stars,
        availableNums,
        candidateNums,
        secondsLeft,
        setGameState,
    } = useGameState();

    const buttons = 9;

    //sum of selected numbers are greater than the number of stars
    const candidatesAreWrong = utils.sum(candidateNums) > stars;

    const gameStatus = availableNums.length === 0 ? 'won' :
        (secondsLeft === 0 ? 'lost' : 'active');

    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    };

    const onNumberClick = (number, currentStatus) => {
        if (gameStatus !== 'active' || currentStatus === 'used')
            return;

        //add candidate to array OR deselect wrong candidate number
        const newCandidateNums =
            currentStatus === 'available' ?
                candidateNums.concat(number)
                : candidateNums.filter(cn => cn !== number);

        setGameState(newCandidateNums); //set state whenever button clicked
    };

    //Readability Tip: don't do any computations within return statement

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more digits that sum to the number of stars. 
                You can only use each digit once. Use up all of the digits to win!
            </div>
            <div className="body">
                <div className="left">
                    {gameStatus !== 'active' ?
                        <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus}/> : <StarsDisplay count={stars} />
                    }      
                </div>
                <div className="right">
                    {utils.range(1, buttons).map(number =>
                        <PlayNumber
                            key={number}
                            status={numberStatus(number)}
                            number={number}
                            onClick={onNumberClick}
                        />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

//each StarMatch component represents a single game
const StarMatch = () => {
    const [gameId, setGameId] = useState(1);
    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />; 
    //to make a new game, change key. each key corresponds to one component
    //By unmounting and remounting StarMatch components,
    //you reset states and any side effects
}


// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

// Math science
const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
        const sets = [[]];
        const sums = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0, len = sets.length; j < len; j++) {
                const candidateSet = sets[j].concat(arr[i]);
                const candidateSum = utils.sum(candidateSet);
                if (candidateSum <= max) {
                    sets.push(candidateSet);
                    sums.push(candidateSum);
                }
            }
        }
        return sums[utils.random(0, sums.length - 1)];
    },
};

ReactDOM.render(<StarMatch />, document.getElementById("root"));
