import { TaskState, TaskAction } from './types';

const storage = window.localStorage;
const storArr = storage.getItem('taskArray');
const storageTaskArray =  storArr ? JSON.parse(storArr) : null;

const initialState: TaskState = {
  taskArray:  storageTaskArray ? storageTaskArray : []
}

export default function taskReducer(state = initialState, action : TaskAction): TaskState {
  const taskArray = state.taskArray;
  const task = taskArray.find(el => el.id === action.payload);
  function storageAction() {
    storage.setItem('taskArray', JSON.stringify([...taskArray]))
  }

  switch (action.type) {
    case 'SET_TASK':
      storage.setItem('taskArray', JSON.stringify([...state.taskArray, action.payload]))
      return { ...state, taskArray: [...state.taskArray, action.payload] }

    case 'INCREMENT_POMODORO':
      if (task) {
        task.repeats +=  1
        storageAction();
      }
      return { ...state, taskArray: [...taskArray]}

    case 'DECREMENT_POMODORO':
      if (task) {
        task.repeats -=  1        
        storageAction();
      }
      return { ...state, taskArray: [...taskArray]}
  
    case 'DELETE_TASK':
      if (task) {
        taskArray.splice(taskArray.indexOf(task), 1);
        storageAction();
      }
      return { ...state, taskArray: [...taskArray]}
  
    case 'EDIT_TASK_NAME':
      const editedTask = taskArray.find(el => el.id === action.payload.id);
      if (editedTask) {
        editedTask.name = action.payload.name
        storageAction();
      }
      return { ...state, taskArray: [...taskArray]}

    default:
      return state;
  }
}