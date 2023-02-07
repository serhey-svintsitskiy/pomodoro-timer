import { configureStore, combineReducers } from '@reduxjs/toolkit';
import taskSlice from './taskSlice';
import timerSlice from './timerSlice';
//import { appReducer } from "./appReducer";


// const rootReducer = combineReducers({
//     tasks: taskSlice,
//     timer: timerSlice
// })

export const store = configureStore({
    reducer: {
        tasks: taskSlice,
        timer: timerSlice,
    }
});