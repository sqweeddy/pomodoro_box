import { StatsAction, StatsState } from "./types";

const storage = window.localStorage;
const storArr = storage.getItem('statsArray');
const storageStatsArray =  storArr ? JSON.parse(storArr) : null;

const initialState: StatsState = {
  statsArray: storageStatsArray ? storageStatsArray :
  [
    // {
    //   monthDay: 14,
    //   weekDay: 4,
    //   workTime: 90,
    //   pomodoroNumber: 1,
    //   pauseTime: 55,
    //   stopNumber: 8
    // },
    // {
    //   monthDay: 15,
    //   weekDay: 5,
    //   workTime: 556,
    //   pomodoroNumber: 22,
    //   pauseTime: 24,
    //   stopNumber: 1
    // },
    // {
    //   monthDay: 16,
    //   weekDay: 6,
    //   workTime: 66,
    //   pomodoroNumber: 2,
    //   pauseTime: 60,
    //   stopNumber: 3
    // },
    // {
    //   monthDay: 17,
    //   weekDay: 0,
    //   workTime: 77,
    //   pomodoroNumber: 8,
    //   pauseTime: 61,
    //   stopNumber: 1
    // },
    // {
    //   monthDay: 14,
    //   weekDay: 1,
    //   workTime: 11,
    //   pomodoroNumber: 5,
    //   pauseTime: 122,
    //   stopNumber: 6
    // },
    // {
    //   monthDay: 15,
    //   weekDay: 2,
    //   workTime: 22,
    //   pomodoroNumber: 9,
    //   pauseTime: 77,
    //   stopNumber: 2
    // },
    // {
    //   monthDay: 16,
    //   weekDay: 3,
    //   workTime: 33,
    //   pomodoroNumber: 7,
    //   pauseTime: 0,
    //   stopNumber: 11
    // },
    // {
    //   monthDay: 17,
    //   weekDay: 4,
    //   workTime: 44,
    //   pomodoroNumber: 54,
    //   pauseTime: 0,
    //   stopNumber: 10
    // },
    // {
    //   monthDay: 17,
    //   weekDay: 5,
    //   workTime: 78,
    //   pomodoroNumber: 44,
    //   pauseTime: 78,
    //   stopNumber: 0
    // },
    // {
    //   monthDay: 17,
    //   weekDay: 6,
    //   workTime: 55,
    //   pomodoroNumber: 12,
    //   pauseTime: 36,
    //   stopNumber: 0
    // },
    // {
    //   monthDay: 17,
    //   weekDay: 0,
    //   workTime: 66,
    //   pomodoroNumber: 71,
    //   pauseTime: 27,
    //   stopNumber: 3
    // },
   ]
}

export default function statsReducer(state= initialState, action: StatsAction):StatsState {
  const statsArray = state.statsArray;
  const day = statsArray.find(el => el.monthDay === action.payload);
  function storageAction() {
    storage.setItem('statsArray', JSON.stringify([...statsArray]))
  }

  switch (action.type) {
    case 'SET_DAY':
      const elemS = statsArray.find(el => el.monthDay === action.payload.monthDay);
      if (elemS) {        
        return state
      } else {
        storage.setItem('statsArray', JSON.stringify([...statsArray, action.payload]))
        return { ...state, statsArray: [...statsArray, action.payload] }
      }
  
    case 'ADD_POMODORO':
      const elem = statsArray.find(el => el.monthDay === action.payload.monthDay);
      if (elem) {
        elem.pomodoroNumber += 1;
        elem.workTime += action.payload.workTime
        storageAction();
      }
      return { ...state, statsArray: [...statsArray] }
    
    case 'ADD_STOP':
      if (day) {
        day.stopNumber += 1
        storageAction();
      }
      return { ...state, statsArray: [...statsArray] }
  
    case 'ADD_PAUSE':
      if (day) {
        day.pauseTime += 1
        storageAction();
      }
      return { ...state, statsArray: [...statsArray] }
  
    case 'SKIP_PAUSE':
      if (day) {
        day.pauseTime -= 1
        storageAction();
      }
      return { ...state, statsArray: [...statsArray] }
    
    default:
      return state;
  }
}