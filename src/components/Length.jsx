import React from 'react';

const Length = ({title, changeTime, time, type}) => {

    return (
        <div>
            <div>
                <h4>{title}</h4>
                <h2>{time}</h2>
                <button onClick={() => changeTime(-1, type)}>-</button>
                <button onClick={() => changeTime(1, type)}>+</button>
            </div>
        </div>
    );
};

export default Length;