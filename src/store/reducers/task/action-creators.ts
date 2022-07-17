import { TaskAction, TaskObject } from './types';


export const TaskActionCreators = {
  setTask: (task: TaskObject): TaskAction => ({type: 'SET_TASK', payload: task}),
  incrementTaskPomodoro: (id: string): TaskAction => ({type: 'INCREMENT_POMODORO', payload: id}),
  decrementTaskPomodoro: (id: string): TaskAction => ({type: 'DECREMENT_POMODORO', payload: id}),
  deleteTask: (id: string): TaskAction => ({type: 'DELETE_TASK', payload: id}),
  editTask: (id: string, name: string): TaskAction => ({type: 'EDIT_TASK_NAME', payload: {id: id,  name: name}}),
}