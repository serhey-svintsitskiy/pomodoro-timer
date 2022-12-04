import './App.css';
import React from "react";
import {useState, useEffect} from "react";
import Length from "./components/Length";

function App() {

    const [brakeTime, setBrakeTime] = useState(5);
    const [pomodoroTime, setPomodoroTime] = useState(10);
    const [displayTime, setDisplayTime] = useState(pomodoroTime);
    const [mode, setMode] = useState(true);
    const [isPaused, setIsPaused] = useState(true);

// =============== Вынести в компонет Format Time ====================================
    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        return (
            (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
        );
    }

// ===================--  --=======================================================


    let interval;

    function stop() {
        clearInterval(interval);
    }

    useEffect(() => {
        if (isPaused) {
            return;
        } else {
            interval = setInterval(() => {
                setDisplayTime(displayTime - 1);
            },1000)
        }

        if (displayTime === 0) {
            stop();
            setIsPaused(true);
            setMode(!mode);
        }
        return () => clearInterval(interval);
    }, [displayTime, isPaused]);


    console.log('mode: ' + mode);
    console.log('isPaused: ' + isPaused);




// =============================================================================


const changeTime = (amount, type) => {
    if (type === 'pomodoro') {
        setPomodoroTime((prev) => prev + amount);
    } else {
        setBrakeTime((prev) => prev + amount);
    }
}

//console.log('mode: ' + mode);
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


