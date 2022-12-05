import React from 'react';

const Length = ({pomodoroTime, brakeTime}) => {

    function changeTime() {

    }

    return (
        <div style={{backgroundColor: 'grey', display: "flex", justifyContent: 'center', alignItems: 'center'}}>
            <div style={{margin: '10px'}}>
                <h4>Pomodoro length</h4>
                <button onClick={() => pomodoroTime()}>-</button>
                <span style={{margin: '10px'}}>5</span>
                <button>+</button>
            </div >
            <div style={{margin: '10px'}}>
                <h4>Brake length</h4>
                <button>-</button>
                <span style={{margin: '10px'}}>5</span>
                <button>+</button>
            </div>
        </div>
    )
}

export default Length;