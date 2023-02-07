import { createSlice } from "@reduxjs/toolkit";
import { countTotal } from "./taskSlice";

const initialState = {
    pomodoroTime: 10,
    breakTime: 5,
    displayTime: 10,
    isWorking: false,
    isPause: false,
    mode: 'pomodoro',
    workedTime: 0
}

export const timerSlice = createSlice({
    name: "timerSlice",
    initialState,
    reducers: {

        decrement: (state) => {
            state.displayTime -= 1;
        },
        start: (state) => {
            state.isWorking = true;
            state.isPause = false;
        },
        stop: (state) => {
            state.isWorking = false;
            state.isPause = false;
            if (state.mode === 'pomodoro') {
                state.workedTime = state.pomodoroTime - state.displayTime;
                state.mode = 'break';
                state.displayTime = state.breakTime;
            } else {
                state.mode = 'pomodoro';
                state.displayTime = state.pomodoroTime;
            }
            console.log(state.workedTime);
        },
        pause: (state) => {
            state.isPause = true;
            state.isWorking = false;
        },
        startTrackingTask: (state) => {
            state.mode = 'pomodoro';
            state.displayTime = state.pomodoroTime;
            state.isWorking = true;
            state.isPause = false;
        },
        changeMode: (state, action) => {
            state.mode = action.payload.mode;
        },
    }
});

export const {decrement, start, stop, pause, startTrackingTask, changeMode} = timerSlice.actions;

export const selectDisplayTime = (state) => state.timer.displayTime;
export const selectMode = (state) => state.timer.mode;
export const selectPomodoroTime = (state) => state.timer.pomodoroTime;
export const selectBreakTime = (state) => state.timer.breakTime;
export const selectIsWorking = (state) => state.timer.isWorking;
export const selectIsPause = (state) => state.timer.isPause;
export const selectWorkedTime = (state) => state.timer.workedTime;

export const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
        (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
    );
}

export const stopTimer = () => (dispatch, getState) => {
    const currentWorkedTime = selectWorkedTime(getState());

    dispatch(countTotal({workedTime: currentWorkedTime}));
    dispatch(stop());
}


export default timerSlice.reducer;