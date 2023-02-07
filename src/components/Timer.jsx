import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    decrement,
    formatTime,
    pause,
    selectDisplayTime,
    selectIsPause,
    selectIsWorking,
    selectMode,
    start,
    stopTimer,
    /*stop,*/
    selectWorkedTime,
} from "../store/timerSlice";
import { selectCurrentTask/*, countTotal*/ } from "../store/taskSlice";
import Button from 'react-bootstrap/Button';


export const Timer = () => {

    const displayTime = useSelector(selectDisplayTime);
    const mode = useSelector(selectMode);
    const isWorking = useSelector(selectIsWorking);
    const isPausing = useSelector(selectIsPause);
    const currentTask = useSelector(selectCurrentTask);
    /*const workedTime =*/ useSelector(selectWorkedTime);
    const dispatch = useDispatch();

    useEffect(() => {
        let timer = setInterval(decTime, 1000);

        function decTime() {
            if (isWorking) {
                if (displayTime >= 1) {
                    dispatch(decrement());
                } else {
                    dispatch(stopTimer());
                    clearInterval(timer);
                }
            }
        }
        return () => clearInterval(timer);
    }, [displayTime, isWorking]);


    return (
        <div className="timer-content">
            <div className={mode === "pomodoro" ? "work-mode" : "brake-mode"}>
                <h3>Status Timer: {mode}</h3>
                {currentTask.title ? <h3>Current task: {currentTask.title}</h3> : null}
                <h2>{formatTime(displayTime)}</h2>
                {!isPausing
                    ? <Button onClick={() => {
                            !isWorking ? dispatch(start())
                                : mode === "pomodoro" ? dispatch(pause()) : dispatch(stopTimer())
                        }}>
                            {!isWorking ? "Start" : mode === "pomodoro" ? "Pause" : "Skip brake"}
                        </Button>
                    : <div>
                        <Button onClick={() => dispatch(start())}>Continue</Button>
                        <Button onClick={() => dispatch(stopTimer())}>Stop</Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Timer;