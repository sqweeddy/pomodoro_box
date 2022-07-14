import React, { useState } from "react";
import Select, { OnChangeValue } from "react-select";
import styles from "./statistics.module.css";
import { ReactComponent as FocusIcon } from "../../images/focus.svg";
import { ReactComponent as TimerIcon } from "../../images/timer.svg";
import { ReactComponent as StopIcon } from "../../images/stop.svg";
import { ReactComponent as SmileTomatoIcon } from "../../images/smile-tomato.svg";
import { ReactComponent as TomatoIcon } from "../../images/tomato.svg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Stats } from "../../store/reducers/stats/types";

interface IDefault {
  monthDay?: number;
  weekDay?: number | string;
  weekDayFull?: string;
  workTime?: number;
  pomodoroNumber?: number;
  pauseTime?: number;
  stopNumber?: number;
  weekDayString?: string;
}

interface IWeeks {
  lastWeek?: IDefault[];
  currentWeek?: IDefault[];
}

export function Statistics() {
  const statsArray = useTypedSelector((state) => state.statsReducer.statsArray);
  let lastWeek: IDefault[];
  let currentWeek: IDefault[];

  function checkArray(arr: Stats[], defaultArr: IDefault[]): IWeeks {
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

  function changeTitles(arr: IDefault[]) {
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

  const data: IDefault[] = [
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
  const correctArr = checkArray(statsArray, data);

  const [day, setDay] = useState("Суббота");
  const [workTime, setWorkTime] = useState(0);
  const [pomodoros, setPomodoros] = useState(undefined);
  const [pauseTime, setPauseTime] = useState(0);
  const [stopNumber, setStopNumber] = useState(0);
  const [week, setWeek] = useState(correctArr.currentWeek);

  const focusTime = Math.floor((workTime / (workTime + pauseTime)) * 100);

  function handleBarClick() {
    setDay(arguments[0].weekDayFull);
    setWorkTime(arguments[0].workTime);
    setPomodoros(arguments[0].pomodoroNumber);
    setPauseTime(arguments[0].pauseTime);
    setStopNumber(arguments[0].stopNumber);
  }

  const options = [
    {
      value: correctArr.currentWeek ? correctArr.currentWeek : data,
      label: "Эта неделя",
    },
    {
      value: correctArr.lastWeek ? correctArr.lastWeek : data,
      label: "Прошедшая неделя",
    },
  ];

  function handleChange(selectedOption: any) {
    setWeek(selectedOption.value);
  }

  // function getValue() {
  //   return week ? options.find(w => w.value === week) : ''
  // }

  return (
    <main>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Ваша активность</h2>
          <Select
            isSearchable={false}
            options={options}
            onChange={handleChange}
            defaultValue={{
              value: correctArr.currentWeek,
              label: "Эта неделя",
            }}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.topMetaData}>
            <div className={styles.aside}>
              <div className={styles.dayDataContent}>
                <div className={styles.blockTitle}>{day}</div>
                <div className={styles.dayData}>
                  {workTime === 0
                    ? "Нет данных"
                    : `Вы работали над задачами в течении ${workTime} минут`}
                </div>
              </div>
              {pomodoros === undefined ? (
                <div className={styles.pomodoroData}>
                  <SmileTomatoIcon />
                </div>
              ) : (
                <div className={styles.pomodoroDataE}>
                  <div>
                    <TomatoIcon className={styles.tomatoIcon} />
                  </div>
                  <div className={styles.pomodoroNumber}>
                    {pomodoros} помидора
                  </div>
                </div>
              )}
            </div>
            <div className={styles.timetable}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={week}
                  margin={{
                    top: 0,
                    right: 10,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid horizontal={true} vertical={false} />
                  <XAxis
                    dataKey="weekDayString"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                  />
                  {/* <Tooltip cursor={{ fill: "none" }} /> */}
                  <Bar
                    dataKey="workTime"
                    fill="#EA8A79"
                    cursor="pointer"
                    maxBarSize={145}
                    onClick={handleBarClick}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className={styles.botMetaData}>
            <div className={styles.focus}>
              <div className={styles.blockLeft}>
                <div className={styles.blockTitle}>Фокус</div>
                <div className={styles.blockData}>
                  {workTime > 0 ? focusTime : workTime}%
                </div>
              </div>
              <div className={styles.blockRight}>
                <FocusIcon />
              </div>
            </div>
            <div className={styles.pauseTime}>
              <div className={styles.blockLeft}>
                <div className={styles.blockTitle}>Время на паузе</div>
                <div className={styles.blockData}>{pauseTime}м</div>
              </div>
              <div className={styles.blockRight}>
                <TimerIcon />
              </div>
            </div>
            <div className={styles.stopCounter}>
              <div className={styles.blockLeft}>
                <div className={styles.blockTitle}>Остановки</div>
                <div className={styles.blockData}>{stopNumber}</div>
              </div>
              <div className={styles.blockRight}>
                <StopIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
