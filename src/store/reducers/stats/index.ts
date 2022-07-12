import { StatsAction, StatsState } from "./types";


const initialState: StatsState = {
  statsArray: []
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