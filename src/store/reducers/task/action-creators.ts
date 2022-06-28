import { TaskAction, TaskObject } from './types';


export const TaskActionCreators = {
  setTask: (task: TaskObject): TaskAction => ({type: 'SET_TASK', payload: task}),
  incrementTaskPomodoro: ():TaskAction => ({type: 'INCREMENT_POMODORO', payload: 1}),
  decrementTaskPomodoro: ():TaskAction => ({type: 'DECREMENT_POMODORO', payload: -1}),
  deleteTask: ():TaskAction => ({type: 'DECREMENT_POMODORO', payload: -1}),
}