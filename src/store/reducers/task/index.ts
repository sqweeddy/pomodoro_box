import { TaskState, TaskAction } from './types';


const initialState: TaskState = {
  taskArray: []
}

export default function taskReducer(state = initialState, action : TaskAction): TaskState {
  const taskArray = state.taskArray;
  const task = taskArray.find(el => el.id === action.payload);

  switch (action.type) {
    case 'SET_TASK':
      return { ...state, taskArray: [...state.taskArray, action.payload] }

    case 'INCREMENT_POMODORO':
      if (task) {
        task.repeats +=  1
      }
      return { ...state, taskArray }

    case 'DECREMENT_POMODORO':
      if (task) {
        task.repeats -=  1        
      }
      return { ...state, taskArray }
  
    case 'DELETE_TASK':
      if (task) {
        taskArray.splice(taskArray.indexOf(task), 1);
      }
      return { ...state, taskArray }
  
    default:
      return state;
  }
}