import {createContext, useContext, useState, useEffect} from "react";
import {useTaskContext} from "../AppContext";


 const TimerContext = createContext();
export const useTimerContext = () => {
    return useContext(TimerContext)
};

export const TimerContextProvider = ({children}) => {

    const {countTotal} = useTaskContext();

    const [pomodoroTime, setPomodoroTime] = useState(10);
    const [brakeTime, setBrakeTime] = useState(5);

    const [displayTime, setDisplayTime] = useState(pomodoroTime);
    const [status, setStatus] = useState({
        working: false,
        pause: false,
        textButton: 'Start',
        statusMessage: 'Lets to work!'
    });
    const [mode, setMode] = useState('pomodoro');

    //const [totalTime, setTotalTime] = useState(0);

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        return (
            (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
        );
    }

    function resetTimer() {
        setMode(prev => 'pomodoro')
        setDisplayTime(pomodoroTime);
        setStatus({...status, working: false, pause: false});

    }

    function startTimer() {
        if (!status.working && !status.pause && mode === 'pomodoro') { // начало
            setStatus({...status, working: true, textButton: 'Pause'});
        } else if (status.working && !status.pause && mode === 'pomodoro') { // когда при pomodoro жмем Pause
            setStatus({...status, working: false, pause: true, textButton: 'Start to rest!'});
        } else if (!status.working && status.pause && mode === 'pomodoro') { // когда находимся в режиме паузы и жмем Continue
            setStatus({...status, pause: false, working: true, textButton: 'Pause'})
        } else if (!status.working && !status.pause && mode === 'brake') { // когда в brake жмем Start
            setStatus({...status, working: true, textButton: 'Skip brake'});
        } else { // когда при brake нажали Skip brake
            stopTimer();
            switchMode();
            setStatus({...status, working: false, pause: false, textButton: "Start"});
        }
    }
// =====================================================================================

    function stopTimer() {
        clearInterval(interval);
        setDisplayTime(pomodoroTime);
        setStatus({...status, pause: false, working: false, textButton: 'Start'});
        if (mode === 'pomodoro') {
            countTotal(pomodoroTime - displayTime);
        }
    }
// =======================================================================================
    function switchMode() {
        if (mode === 'brake') {
            setMode(prev => 'pomodoro');
            setDisplayTime(pomodoroTime);
            setStatus({...status, statusMessage: 'Time to work!'});
        } else {
            setMode(prev => 'brake');
            setDisplayTime(brakeTime);
            setStatus({...status, statusMessage: 'Time to rest!'})
        }
    }

    let interval;

    useEffect(() => {
        if (!status.working) {
            return;
        } else {
            interval = setInterval(() => {
                setDisplayTime(displayTime - 1);
            }, 1000)
        }
        // if (status.working && mode === 'pomodoro') {
        //     setStatus({...status, statusMessage: 'working time...'});
        // } else if (status.working && mode === 'brake') {
        //     setStatus({...status, statusMessage: 'resting time...'});
        // }
        if (displayTime === 0) {
            stopTimer();
            switchMode();
            setStatus({...status, working: false, textButton: 'Start'})

        }
        return () => clearInterval(interval);
    }, [displayTime, status]);

    return (
        <TimerContext.Provider value={{
            formatTime,
            displayTime,
            pomodoroTime,
            brakeTime,
            status,
            mode,
            startTimer,
            stopTimer,
            resetTimer
        }}>
            {children}
        </TimerContext.Provider>
    );
}