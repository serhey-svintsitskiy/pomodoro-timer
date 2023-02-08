import './App.css';

import Tasks from "./components/Tasks";
import Timer from "./components/Timer";

import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import taskSliceReducer from './store/TaskSlice';
import timerSliceReducer from './store/TimerSlice';

export const PomodoreStore = configureStore({
    reducer: {
        tasks: taskSliceReducer,
        timer: timerSliceReducer
    }
});

function App() {
    return (
        <Provider store={PomodoreStore}>
            <div>
                <div>
                    <Timer/>
                    <Tasks/>
                </div>
            </div>
        </Provider>
    );
}

export default App;


