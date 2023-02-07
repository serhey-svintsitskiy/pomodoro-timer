import Task from "./Task";
import { useSelector } from 'react-redux';
import { selectTasks, selectSearchQuery } from "../store/taskSlice";
import { selectCurrentTask } from "../store/taskSlice";

const TaskList = () => {

    const currentTask = useSelector(selectCurrentTask);

    const tasks = useSelector(selectTasks);
    const searchQuery = useSelector(selectSearchQuery);

    const filteredTasks = tasks.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()));

    console.table(currentTask);

    return (
        <div>
            {filteredTasks.map((task) =>
                <Task
                    key={task.id}
                    task={task}
                />
            )}
        </div>
    );
};

export default TaskList;