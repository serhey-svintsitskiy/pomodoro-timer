import './App.css';
import React from "react";
import {useState, useEffect} from "react";
import Length from "./components/Length";

function App() {

    const [brakeTime, setBrakeTime] = useState(0.25 * 60);
    const [pomodoroTime, setPomodoroTime] = useState(15);
    const [displayTime, setDisplayTime] = useState(pomodoroTime);
    const [mode, setMode] = useState('work'); // work/brake/null
    const [isPaused, setIsPaused] = useState(true);

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        return (
            (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
        );
    }

    //====================================================================
    // let timer;
    //
    // const start = () => {
    //     if (mode) {
    //         timer = setInterval(() => {
    //             setDisplayTime((prev) => prev - 1);
    //         }, 1000)
    //         if (setDisplayTime === 0) {
    //             return clearInterval(timer);
    //         }
    //     }
    // }


// ===================-- Кнопки Start и Stop --========================================================

    function tick() {
        setDisplayTime(displayTime - 1);
    }

    console.log(isPaused);

    useEffect(() => {

        function switchMode() {
            const nextMode = mode === 'work' ? 'break' : 'work';
            setMode(nextMode);
            console.log('switchMode has been working...')
        }

        const interval = setInterval(() => {
            if (isPaused) {
                return;
            }
            if (displayTime === 0) {
                return switchMode();
            }
            tick();
        }, 1000)

        return () => clearInterval(interval);
    })

// =============================================================================


    const changeTime = (amount, type) => {
        if (type === 'pomodoro') {
            setPomodoroTime((prev) => prev + amount);
        } else {
            setBrakeTime((prev) => prev + amount);
        }
    }

    return (
        <div className="App">
            <Length title="Pomodoro length" time={pomodoroTime} changeTime={changeTime} type='pomodoro'/>
            <Length title="Brake length" time={brakeTime} changeTime={changeTime} type='break'/>
            <div>
                <h3>Display time</h3>
                <h1>{formatTime(displayTime)}</h1>
                <button onClick={() => setIsPaused(false)}>Starting!</button>
                <button onClick={null}>Stop</button>
            </div>
        </div>
    );
}

export default App;


