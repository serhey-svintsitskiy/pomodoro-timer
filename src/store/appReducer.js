import { combineReducers } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice";
import timerSlice from "./timerSlice";
import {testSlice} from "./testSlice";

export const appReducer = combineReducers({
    tasks: taskSlice,
    timer: timerSlice,
    test: testSlice
});