import './App.css';
import React from "react";
import {useState, useEffect} from "react";
import Length from "./components/Length";

function App() {

    const [brakeTime, setBrakeTime] = useState(5);
    const [pomodoroTime, setPomodoroTime] = useState(10);
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


// ===================-- Кнопки Start и Stop --========================================================

    function tick() {
        setDisplayTime(displayTime - 1);
    }

    let interval;

    useEffect(() => {

        function switchMode() {
            const nextMode = mode === 'work' ? 'break' : 'work';
            setMode(nextMode);

        }

             interval = setInterval(() => {
            if (isPaused) {
                return;
            }
            if (displayTime === 0) {
                return switchMode();
                if (mode === 'work') {
                    setDisplayTime(pomodoroTime);
                } else {
                    setDisplayTime(brakeTime);
                }
            }
            tick();
        }, 1000)

        return () => clearInterval(interval);
    })

    function stop() {
        clearInterval(interval);
    }

// =============================================================================


    const changeTime = (amount, type) => {
        if (type === 'pomodoro') {
            setPomodoroTime((prev) => prev + amount);
        } else {
            setBrakeTime((prev) => prev + amount);
        }
    }

     console.log('mode: ' + mode);
    //console.log(displayTime);

    return (
        <div className="App">
            <Length title="Pomodoro length" time={pomodoroTime} changeTime={changeTime} type='pomodoro'/>
            <Length title="Brake length" time={brakeTime} changeTime={changeTime} type='break'/>
            <div>
                <h3>Display time</h3>
                <h1>{formatTime(displayTime)}</h1>
                <button onClick={() => setIsPaused(false)}>Starting!</button>
                <button onClick={stop}>Stop</button>
            </div>
        </div>
    );
}

export default App;


