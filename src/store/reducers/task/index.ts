import { TaskState, TaskAction } from './types';


const initialState: TaskState = {
  taskArray: []
}

export default function taskReducer(state = initialState, action : TaskAction): TaskState {
  switch (action.type) {
    case 'SET_TASK':
      return { ...state, taskArray: [...state.taskArray, action.payload] }

    // case 'INCREMENT_POMODORO':
    //   return { ...state, taskArray: [{repeats: } ] }
  
    default:
      return state;
  }
}