import { Stats } from "../store/reducers/stats/types";

export interface IDefault {
  monthDay?: number;
  weekDay?: number | string;
  weekDayFull?: string;
  workTime?: number;
  pomodoroNumber?: number;
  pauseTime?: number;
  stopNumber?: number;
  weekDayString?: string;
}

export interface IWeeks {
  lastWeek?: IDefault[];
  currentWeek?: IDefault[];
}

let lastWeek: IDefault[];
let currentWeek: IDefault[];

export function checkArray(arr: Stats[], defaultArr: IDefault[]): IWeeks {
  const monday = arr.find((el) => el.weekDay === 1);

  function fillWeek(arr: Stats[], defaultArr: IDefault[]) {
    let fullWeek = defaultArr.slice(0);

    for (let index = 0; index < arr.length; index++) {
      const dayNumb = arr[index].weekDay === 0 ? 6 : arr[index].weekDay - 1;
      fullWeek.splice(dayNumb, 1, arr[index]);
    }
    return fullWeek;
  }

  if (arr.length > 7) {
    if (monday) {
      const weekStart = arr.indexOf(monday);
      const curWeek = arr.slice(weekStart);
      const lstWeek = arr.slice(0, weekStart);
      currentWeek = changeTitles(fillWeek(curWeek, defaultArr));
      lastWeek = changeTitles(fillWeek(lstWeek, defaultArr));
      return {
        currentWeek,
        lastWeek,
      };
    }
  } else {
    currentWeek = changeTitles(fillWeek(arr, defaultArr));
    return { currentWeek };
  }

  return {
    currentWeek,
    lastWeek,
  };
}

export function changeTitles(arr: IDefault[]) {
  arr.map((el) => {
    switch (el.weekDay) {
      case 0:
        el.weekDay = 7;
        el.weekDayString = "Вс";
        el.weekDayFull = "Воскресенье";
        return el;
      case 1:
        el.weekDayString = "Пн";
        el.weekDayFull = "Понедельник";
        return el;
      case 2:
        el.weekDayString = "Вт";
        el.weekDayFull = "Вторник";
        return el;
      case 3:
        el.weekDayString = "Ср";
        el.weekDayFull = "Среда";
        return el;
      case 4:
        el.weekDayString = "Чт";
        el.weekDayFull = "Четверг";
        return el;
      case 5:
        el.weekDayString = "Пт";
        el.weekDayFull = "Пятница";
        return el;
      case 6:
        el.weekDayString = "Сб";
        el.weekDayFull = "Суббота";
        return el;

      default:
        return el;
    }
  });
  return arr;
}

export const data: IDefault[] = [
  {
    weekDayString: "Пн",
    workTime: 0,
  },
  {
    weekDayString: "Вт",
    workTime: 0,
  },
  {
    weekDayString: "Ср",
    workTime: 0,
  },
  {
    weekDayString: "Чт",
    workTime: 0,
  },
  {
    weekDayString: "Пт",
    workTime: 0,
  },
  {
    weekDayString: "Сб",
    workTime: 0,
  },
  {
    weekDayString: "Вс",
    workTime: 0,
  },
];

export const timeStampDay = new Date().getDay();
export const currDayClear = new Date().getDay() === 0 ? 7 : new Date().getDay();
function getStringDay(number :number| string) {
  switch (number) {
    case 0:
        number = "Воскресенье";
        return number;
      case 1:
        number = "Понедельник";
        return number;
      case 2:
        number = "Вторник";
        return number;
      case 3:
        number = "Среда";
        return number;
      case 4:
        number = "Четверг";
        return number;
      case 5:
        number = "Пятница";
        return number;
      case 6:
        number = "Суббота";
        return number;

      default:
        return number;
    }
}
export const currentDay = getStringDay(timeStampDay)

export function setEnding(value: number, words: string[]){  
	value = Math.abs(value) % 100; 
	const num = value % 10;
	if(value > 10 && value < 20) return words[2]; 
	if(num > 1 && num < 5) return words[1];
	if(num === 1) return words[0]; 
	return words[2];
}

export function getTime(mins: number) {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  if (mins <= 60) {
    return mins +'м'
  } else return hours + 'ч ' + minutes + 'м'
}

export function getWorkTime(mins: number) {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  if (mins <= 60) {
    return mins + ' ' + setEnding(mins, minutesArr)
  } else return hours + ' ' + setEnding(hours, hoursArr) + ' ' + minutes + ' ' + setEnding(minutes, minutesArr)
}

export const hoursArr = ['часа', "часов", "часов"];
export const minutesArr = ['минуты', "минут", "минут"];
export const pomodorosArr = ['помидор', "помидора", "помидоров"];