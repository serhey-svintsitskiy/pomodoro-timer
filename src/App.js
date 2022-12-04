import './App.css';
import React from "react";
import {useState, useEffect} from "react";

function App() {

    const [displayTime, setDisplayTime] = useState(10);

// =============== Вынести в компонет Format Time ====================================
    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        return (
            (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
        );
    }

// =============================================================================



// =============================================================================


return (
    <div className="App">
        <div>
            <h3>Display time</h3>
            <h1>{formatTime(displayTime)}</h1>
        </div>
    </div>
);
}

export default App;


