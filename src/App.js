import './App.css';
import React from "react";
import {useState, useEffect} from "react";

function App() {

    const [pomodoroTime, setPomodoroTime] = useState(10);
    const [brakeTime, setBrakeTime] = useState(5);
    const [displayTime, setDisplayTime] = useState(pomodoroTime);
    const [isWorking, setIsWorking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [textButton, setTextButton] = useState('Start');
    const [mode, setMode] = useState(true);
    const [showMessage, setShowMessage] = useState('Lets to work!');

// =============== Вынести в компонет Format Time ====================================
    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        return (
            (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
        );
    }

// =============================================================================
    function start() {
        if (isWorking) {
            setIsPaused(true);
        }

        setIsWorking(!isWorking);
        if (isWorking) {
            setTextButton('Start');
        } else {
            setTextButton('Pause');
        }
    }

    function stop() {
        clearInterval(interval);
    }
// ===============================================================================
    function switchMode() {
        setMode(!mode);
        if (!mode) {
            setDisplayTime(pomodoroTime);
            setShowMessage('Time to work!');
        } else {
            setDisplayTime(brakeTime);
            setShowMessage('Time to rest!');
        }
    }

    function skipBrake() {
        if (isPaused && mode) {
            setTextButton('Skip brake');
            clearInterval(interval);
        }
    }

    let interval;

    useEffect(() => {
        if (!isWorking) {
            return;
        } else {
            interval = setInterval(() => {
                setDisplayTime(displayTime - 1);
            }, 1000)
        }
        if (isWorking && mode) {
            setShowMessage('working time...')
        } else if (isWorking && !mode) {
            setShowMessage('resting time...')
        }
        if (displayTime === 0) {
            stop();
            setIsWorking(false);
            setTextButton('Start');
            switchMode();
        }

        return () => clearInterval(interval);
    })

// =============================================================================

    console.log('mode: ' + mode);

    return (
        <div className="App">
            <div>
                <h2>Display time</h2>
                <h3>{showMessage}</h3>
                <h1>{formatTime(displayTime)}</h1>
                {!isPaused
                    ? <button onClick={start}>{textButton}</button>
                    : <div>
                        <button onClick={start}>Continue</button>
                        <button onClick={stop}>Stop</button>
                    </div>
                }

            </div>
        </div>
    );
}

export default App;


