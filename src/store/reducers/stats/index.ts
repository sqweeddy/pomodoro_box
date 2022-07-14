import { StatsAction, StatsState } from "./types";


const initialState: StatsState = {
  statsArray: [
    {
      monthDay: 14,
      weekDay: 4,
      workTime: 90,
      pomodoroNumber: 1,
      pauseTime: 5,
      stopNumber: 1
    },
    {
      monthDay: 15,
      weekDay: 5,
      workTime: 55,
      pomodoroNumber: 1,
      pauseTime: 5,
      stopNumber: 1
    },
    {
      monthDay: 16,
      weekDay: 6,
      workTime: 66,
      pomodoroNumber: 1,
      pauseTime: 5,
      stopNumber: 1
    },
    {
      monthDay: 17,
      weekDay: 0,
      workTime: 77,
      pomodoroNumber: 1,
      pauseTime: 5,
      stopNumber: 1
    },
    {
      monthDay: 14,
      weekDay: 1,
      workTime: 11,
      pomodoroNumber: 1,
      pauseTime: 5,
      stopNumber: 1
    },
    {
      monthDay: 15,
      weekDay: 2,
      workTime: 22,
      pomodoroNumber: 1,
      pauseTime: 5,
      stopNumber: 1
    },
    {
      monthDay: 16,
      weekDay: 3,
      workTime: 33,
      pomodoroNumber: 1,
      pauseTime: 5,
      stopNumber: 1
    },
    {
      monthDay: 17,
      weekDay: 4,
      workTime: 44,
      pomodoroNumber: 1,
      pauseTime: 5,
      stopNumber: 1
    },
  ]
}

export default function statsReducer(state= initialState, action: StatsAction):StatsState {
  const statsArray = state.statsArray;
  const day = statsArray.find(el => el.monthDay === action.payload);

  switch (action.type) {
    case 'SET_DAY':
      const elemS = statsArray.find(el => el.monthDay === action.payload.monthDay);
      if (elemS) {        
        return state
      } else {
        return { ...state, statsArray: [...statsArray, action.payload] }
      }
  
    case 'ADD_POMODORO':
      const elem = statsArray.find(el => el.monthDay === action.payload.monthDay);
      if (elem) {
        elem.pomodoroNumber += 1;
        elem.workTime += action.payload.workTime
      }
      return { ...state, statsArray: [...statsArray] }
    
    case 'ADD_STOP':
      if (day) {
        day.stopNumber += 1
      }
      return { ...state, statsArray: [...statsArray] }
  
    case 'ADD_PAUSE':
      if (day) {
        day.pauseTime += 5
      }
      return { ...state, statsArray: [...statsArray] }
  
    case 'SKIP_PAUSE':
      if (day) {
        day.pauseTime -= 5
      }
      return { ...state, statsArray: [...statsArray] }
    
    default:
      return state;
  }
}