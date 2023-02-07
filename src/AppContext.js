import {useState, createContext, useContext} from "react";
import {useTimerContext} from "./components/TimerContext";

const TaskContext = createContext();

export function useTaskContext() {
    return useContext(TaskContext);
}

export const TaskContextProvider = ({children}) => {

    const [tasks, setTasks] = useState([
        {id: 1, title: 'sleep', complete: false, totalTime: 0 },
        {id: 2, title: 'play Witcher', complete: false, totalTime: 0},
        {id: 3, title: 'eat', complete: false, totalTime: 0},
        {id: 4, title: 'have more relax', complete: false, totalTime: 0},
        {id: 5, title: 'eat again', complete: false, totalTime: 0},
        {id: 6, title: 'walk out', complete: false, totalTime: 0},
        {id: 7, title: 'drink tea', complete: false, totalTime: 0},
        {id: 8, title: 'have shower', complete: false, totalTime: 0},
        {id: 9, title: 'drink green tea', complete: false, totalTime: 0},
        {id: 10, title: 'do some interesting', complete: false, totalTime: 0},
        {id: 11, title: 'eat...', complete: false, totalTime: 0} ,
        {id: 12, title: 'tea..', complete: false, totalTime: 0},
        {id: 13, title: 'work just a little... ', complete: false, totalTime: 0}
    ])

    const [searchQuery, setSearchQuery] = useState('');
    const [completedTasks, setCompletedTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState({title: 'choose task to track'})

    const createTask = (task) => {
        setTasks([...tasks, task]);
    }

    const removeTask = (task) => {
        setTasks(tasks.filter((t) => t.id !== task.id))
    }

    const completeTask = (item) => {
        setTasks(tasks.map((task) =>
            task.id === item.id ? {...task, complete: !task.complete} : task));
        setCompletedTasks([...completedTasks, item])
        setTasks(prev => prev.filter(task => task.complete === false ));
    }
    const searchTasks = (query) => {
        setSearchQuery(query);
    }

    const startTrackingTask = (trackingTask) => {
        setCurrentTask(trackingTask);
    }

    const countTotal = (taskTime) => {
        setTasks(tasks.map(task =>
            task.id === currentTask.id ? {...task, totalTime: task.totalTime + taskTime} : task));
    }

    console.table(tasks.filter(t => t.totalTime > 0));

    return (
        <TaskContext.Provider value={{
            tasks,
            createTask,
            removeTask,
            completeTask,
            searchQuery,
            searchTasks,
            startTrackingTask,
            countTotal,
            currentTask
        }}>
            {children}
        </TaskContext.Provider>
    );
}

