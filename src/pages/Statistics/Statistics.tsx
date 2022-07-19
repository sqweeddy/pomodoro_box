import React, { useState } from "react";
import Select from "react-select";
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
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  checkArray,
  currDayClear,
  data,
  getTime,
  getWorkTime,
  pomodorosArr,
  setEnding,
} from "../../utils/stats";

export function Statistics() {
  const statsArray = useTypedSelector((state) => state.statsReducer.statsArray);
  const correctArr = checkArray(statsArray, data);

  const [day, setDay] = useState("Выберите день");
  const [workTime, setWorkTime] = useState("0");
  const [pomodoros, setPomodoros] = useState(0);
  const [pauseTime, setPauseTime] = useState("0");
  const [stopNumber, setStopNumber] = useState(0);
  const [focusNumber, setFocusNumber] = useState(0);
  const [week, setWeek] = useState(correctArr.currentWeek);
  const [activeBar, setActiveBar] = useState(8);

  function handleBarClick() {
    setActiveBar(arguments[1]);
    setDay(arguments[0].weekDayFull);
    setWorkTime(getWorkTime(arguments[0].workTime));
    setPomodoros(arguments[0].pomodoroNumber);
    setPauseTime(getTime(arguments[0].pauseTime));
    setStopNumber(arguments[0].stopNumber);
    setFocusNumber(
      Math.floor(
        (arguments[0].workTime /
          (arguments[0].workTime + arguments[0].pauseTime)) *
          100
      )
    );
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
    setDay("Выберите день");
    setWorkTime("0");
    setPomodoros(0);
    setPauseTime("0");
    setStopNumber(0);
    setFocusNumber(0);
    setActiveBar(8);
  }

  function formatAxis(tickItem: any) {
    return getTime(tickItem);
  }

  return (
    <main>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Ваша активность</h2>
          <Select
            className={styles.select}
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
                  {workTime === "0" ? (
                    <p></p>
                  ) : (
                    <div className={styles.workData}>
                      Вы работали над задачами в течении{" "}
                      <p className={styles.workTime}>{workTime}</p>
                    </div>
                  )}
                </div>
              </div>
              {pomodoros === 0 ? (
                <div className={styles.pomodoroData}>
                  <SmileTomatoIcon />
                </div>
              ) : (
                <div className={styles.pomodoroDataE}>
                  <div>
                    <div className={styles.pomodoroWrap}>
                      <TomatoIcon className={styles.tomatoIcon} />
                      <span className={styles.pomodoroNum}>x {pomodoros}</span>
                    </div>
                  </div>
                  <div className={styles.pomodoroNumber}>
                    {pomodoros + " " + setEnding(pomodoros, pomodorosArr)}
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
                    tickFormatter={formatAxis}
                  />
                  {/* <Tooltip cursor={{ fill: "none" }} /> */}
                  <Bar
                    dataKey="workTime"
                    fill="#EA8A79"
                    cursor="pointer"
                    maxBarSize={145}
                    onClick={handleBarClick}
                  >
                    {data?.map((entry, index) => (
                      <Cell
                        cursor="pointer"
                        fill={index === activeBar ? "#DC3E22" : "#EA8A79"}
                        key={`cell-${index}`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className={styles.botMetaData}>
            <div
              className={workTime === "0" ? styles.focus : styles.focusColor}
            >
              <div className={styles.blockLeft}>
                <div className={styles.blockTitle}>Фокус</div>
                <div className={styles.blockData}>{focusNumber}%</div>
              </div>
              <div className={styles.blockRight}>
                <FocusIcon />
              </div>
            </div>
            <div
              className={
                workTime === "0" ? styles.pauseTime : styles.pauseTimeColor
              }
            >
              <div className={styles.blockLeft}>
                <div className={styles.blockTitle}>Время на паузе</div>
                <div className={styles.blockData}>{pauseTime}</div>
              </div>
              <div className={styles.blockRight}>
                <TimerIcon />
              </div>
            </div>
            <div
              className={
                workTime === "0" ? styles.stopCounter : styles.stopCounterColor
              }
            >
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
