import React, { useState, useEffect, useReducer} from 'react';
const {v4: uuidv4} = require('uuid');

const initialTasksState = {
    tasks: [],
    completedTasks: []
};

const TYPES = {
    ADD_TASK: 'ADD_TASK',
    COMPLETE_TASK: 'COMPLETE_TASK',
    DELETE_TASK: 'DELETE_TASK'
}

const taskReducer = (state, action) => {
    console.log('state', state, 'action', action);

    switch (action.type) {
        case TYPES.ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            }            
            
        case TYPES.COMPLETE_TASK: 
            const { task } = action;

            return {
                ...state,
                completedTasks: [...state.completedTasks, task],
                tasks: state.tasks.filter(t => t.id !== task.id)
            }
        
        case TYPES.DELETE_TASK: 
            // const { task } = action;

            return {
                ...state,
                completedTasks: state.tasks.filter(t => t.id !== action.task.id),
            }        
        default:
            return state;
    }

}

const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';

const storeTasks = ({tasks, completedTasks}) => {
    localStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify({tasks, completedTasks})
    );
}

const readStoredTasks = () => {
    const taskMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));

    return taskMap ? taskMap : initialTasksState;
}

function Tasks() {
    const [taskText, setTaskText] = useState('');
    const storedTasks = readStoredTasks();

    const [state, dispatch] = useReducer(taskReducer, storedTasks);
    const { tasks, completedTasks} = state;

    useEffect(() => {
            storeTasks({tasks, completedTasks});
    }, []);

    const updateTaskText = event => {
        setTaskText(event.target.value);
    }

    const addTask = () => {
        dispatch({type: TYPES.ADD_TASK, task: { taskText, id: uuidv4()}});
    }

    const completeTasks = completeTask => () => {
        dispatch({type: TYPES.COMPLETE_TASK, task: completeTask });
    }

    const deleteTask = task => () => {
        dispatch({type: TYPES.DELETE_TASK, task: task });
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