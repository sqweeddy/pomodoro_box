export interface IPomodoro {
  monthDay: number,
  workTime: number
}

export interface Stats {
  monthDay: number,
  weekDay: number,
  weekDayFull?: string,
  workTime: number,
  pomodoroNumber: number,
  pauseTime: number,
  stopNumber: number
}

export interface StatsState {
  statsArray: Stats[],
}

export interface SetDayAction {
  type: 'SET_DAY',
  payload: Stats
}

export interface AddPomodoroAction {
  type: 'ADD_POMODORO',
  payload: IPomodoro
}


export interface AddStopAction {
  type: 'ADD_STOP',
  payload: number
}

export interface AddPauseAction {
  type: 'ADD_PAUSE',
  payload: number
}

export interface SkipPauseAction {
  type: 'SKIP_PAUSE',
  payload: number
}

export type StatsAction = SetDayAction | AddPomodoroAction | AddStopAction | AddPauseAction | SkipPauseAction 