import './App.css';
import React from "react";
import {useState, useEffect} from "react";

function App() {

    const [displayTime, setDisplayTime] = useState(10);
    const [isWorking, setIsWorking] = useState(false);
    const [isPause, setIsPause] = useState(false);
    const [textButton, setTextButton] = useState('Start')


// =============== Вынести в компонет Format Time ====================================
    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        return (
            (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
        );
    }

// =============================================================================

    const changeTextButton = () => {
        if (isWorking) {
        setTextButton('Pause')
        }
    }

    function stop() {
        clearInterval(interval);
    }

    let interval;

    use

// =============================================================================


    return (
        <div className="App">
            <div>
                <h3>Display time</h3>
                <h1>{formatTime(displayTime)}</h1>
                {!isPause
                ? <button onClick={() => setIsWorking(true)}>{textButton}</button>
                    : <div>
                        <button>Continue</button>
                        <button>Stop</button>
                    </div>
                }



            </div>
        </div>
    );
}

export default App;


