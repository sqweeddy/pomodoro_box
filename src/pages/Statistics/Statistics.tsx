import React from "react";
import Select from "react-select";
import styles from "./statistics.module.css";
import { ReactComponent as FocusIcon } from "../../images/focus.svg";
import { ReactComponent as TimerIcon } from "../../images/timer.svg";
import { ReactComponent as StopIcon } from "../../images/stop.svg";
import { ReactComponent as SmileTomatoIcon } from "../../images/smile-tomato.svg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function Statistics() {
  const data = [
    {
      name: "Пн",
      time: 100,
    },
    {
      name: "Вт",
      time: 200,
    },
    {
      name: "Ср",
      time: 300,
    },
    {
      name: "Чт",
      time: 430,
    },
    {
      name: "Пт",
      time: 120,
    },
    {
      name: "Сб",
      time: 50,
    },
    {
      name: "Вс",
      time: 0,
    },
  ];

  const handleBarClick = () => {
    console.log();
  };
  return (
    <main>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Ваша активность</h2>
          <Select isSearchable={false} />
        </div>
        <div className={styles.content}>
          <div className={styles.topMetaData}>
            <div className={styles.aside}>
              <div className={styles.dayDataContent}>
                <div className={styles.blockTitle}>Суббота</div>
                <div className={styles.dayData}>Нет данных</div>
              </div>
              <div className={styles.pomodoroData}>
                <SmileTomatoIcon />
              </div>
            </div>
            <div className={styles.timetable}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 0,
                    right: 10,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid horizontal={true} vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip cursor={{ fill: "none" }} />
                  <Bar
                    dataKey="time"
                    fill="#EA8A79"
                    cursor="pointer"
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
                <div className={styles.blockData}>0%</div>
              </div>
              <div className={styles.blockRight}>
                <FocusIcon />
              </div>
            </div>
            <div className={styles.pauseTime}>
              <div className={styles.blockLeft}>
                <div className={styles.blockTitle}>Время на паузе</div>
                <div className={styles.blockData}>0м</div>
              </div>
              <div className={styles.blockRight}>
                <TimerIcon />
              </div>
            </div>
            <div className={styles.stopCounter}>
              <div className={styles.blockLeft}>
                <div className={styles.blockTitle}>Остановки</div>
                <div className={styles.blockData}>0</div>
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
