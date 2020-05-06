import React, { useState, useEffect} from 'react';
const {v4: uuidv4} = require('uuid');

const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';

const storeTasks = ({tasks, completedTasks}) => {
    localStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify({tasks, completedTasks})
    );
}

const readStoredTasks = () => {
    const taskMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));

    return taskMap ? taskMap : { tasks: [], completedTasks: [] };
}

function Tasks() {
    const [taskText, setTaskText] = useState('');
    const storedTasks = readStoredTasks();
    const [tasks, setTasks] = useState(storedTasks.tasks);
    const [completedTasks, setCompletedTasks] = useState(storedTasks.completedTasks);

    useEffect(() => {
            storeTasks({tasks, completedTasks});
    });

    const updateTaskText = event => {
        setTaskText(event.target.value);
    }

    const addTask = () => {
        setTasks([...tasks, { taskText, id: uuidv4()}]);
    }

    const completeTasks = completeTask => () => {
        setCompletedTasks([...completedTasks, completeTask]);
        setTasks(tasks.filter(task => task.id !== completeTask.id));
    }

    const deleteTask = task => () => {
        setCompletedTasks(completedTasks.filter(t => t.id !== task.id));
    }

    return (
        <div>
            <h3>
                Tasks
            </h3>
            <div className="form">
                <input value={taskText} onChange={updateTaskText}/>
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className="task-list">
                {
                    tasks.map( task => {
                        const {id, taskText} = task;
                    return (
                    <div key={id} onClick={completeTasks(task)}>
                        {taskText}
                    </div>)
                    })
                }   
            </div>
            <h3>Completed Tasks</h3>
            <div className="completed-list">
                {completedTasks.map(task => {
                    const {taskText, id} = task;

                    return (
                        <div key={id}>
                            {taskText}{'  '}
                            <span onClick={deleteTask(task)}>x</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Tasks;