import { Stats, StatsAction } from './types';


export const StatsActionCreators = {
  setDay: (day: Stats): StatsAction => ({type: 'SET_DAY', payload: day}),
  addPomodoro: (dayNumber: number, workTime: number): StatsAction => ({type: 'ADD_POMODORO', payload: {monthDay: dayNumber, workTime: workTime}}),
  addStop: (dayNumber: number): StatsAction => ({type: 'ADD_STOP', payload: dayNumber}),
  addPause: (dayNumber: number): StatsAction => ({type: 'ADD_PAUSE', payload: dayNumber}),
  skipPause: (dayNumber: number): StatsAction => ({type: 'SKIP_PAUSE', payload: dayNumber}),
}