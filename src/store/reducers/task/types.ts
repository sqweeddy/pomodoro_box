export interface EditTask {
  id: string,
  name: string
}

export interface TaskObject {
    name: string,
    repeats: number,
    id: string
}

export interface TaskState {
  taskArray: TaskObject[],
}

export interface SetTaskAction {
  type: 'SET_TASK',
  payload: TaskObject
}

export interface IncrementPomodoroAction {
  type: 'INCREMENT_POMODORO',
  payload: string
}

export interface DecrementPomodoroAction {
  type: 'DECREMENT_POMODORO',
  payload: string
}

export interface DeleteTaskAction {
  type: 'DELETE_TASK',
  payload: string
}

export interface EditTaskNameAction {
  type: 'EDIT_TASK_NAME',
  payload: EditTask
}

export type TaskAction = SetTaskAction | IncrementPomodoroAction | DecrementPomodoroAction | DeleteTaskAction | EditTaskNameAction