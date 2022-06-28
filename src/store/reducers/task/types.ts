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
  payload: number
}

export interface DecrementPomodoroAction {
  type: 'DECREMENT_POMODORO',
  payload: number
}

export type TaskAction = SetTaskAction | IncrementPomodoroAction | DecrementPomodoroAction