import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { removeTask, completeTask, setCurrentTask } from "../store/taskSlice";
import { startTrackingTask } from "../store/timerSlice";
import Button from 'react-bootstrap/Button';

const Task = ({task}) => {

    const dispatch = useDispatch();

    const trackTask = (task) => {
        dispatch(startTrackingTask());
        dispatch(setCurrentTask(task));
    }   

    const {ref, inView} = useInView({
        threshold: 1
    });

    return (
        <div ref={ref} className="task" style={{backgroundColor: !inView ? 'red' : 'white'}}>
            <div style={{
                padding: '10px',
                display: 'flex',
                flexFlow: 'row',
                alignContent: 'flex-start',
            }}>
                <input
                    type="checkbox"
                    checked={task.complete}
                    onChange={() => dispatch(completeTask(task))}
                />
                <Button onClick={() => trackTask(task)}>Play</Button>
                <div style={{
                    margin: '20px',
                    display: 'flex',
                    flexFlow: 'row wrap',
                    alignContent: 'center',
                }}>
                    <strong>{task.title}</strong>
                </div>
            </div>
            <div style={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: "center",
            }}>
                <div style={{margin: '5px'}}>
                    <strong>{task.totalTime} hour</strong>
                </div>
                <Button style={{marginRight: 'auto'}} onClick={() => dispatch(removeTask(task))}>X</Button>
            </div>
        </div>
    );
};

export default Task;