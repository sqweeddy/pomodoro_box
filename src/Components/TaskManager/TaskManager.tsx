import React, { useRef, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CustomButton, EButtonStyle } from "../../shared/CustomButton";
import styles from "./taskmanager.module.css";

interface IProps {
  minutes: number;
  seconds: number;
  completed: boolean;
}

export function TaskManager() {
  const taskArray = useTypedSelector((state) => state.taskReducer.taskArray);
  const taskTitle = taskArray[0] ? taskArray[0].name : "Текущая задача";
  const pomodoroDelta = taskArray[0] ? taskArray[0].repeats - 1 : 1;
  const pomodoroNumber = taskArray[0]
    ? taskArray[0].repeats - pomodoroDelta
    : 1;
  const [countdownValue, setCountdownValue] = useState(1500000);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>{taskTitle}</div>
        <div>Помидор {pomodoroNumber}</div>
      </div>
      <div className={styles.main}>
        <div className={styles.timer}>25:00</div>
        <div className={styles.task}>
          <div className={styles.taskNumber}>task number - </div>
          <div className={styles.taskName}> {taskTitle}</div>
        </div>
        <div className={styles.buttonBlock}>
          <CustomButton text="Старт" buttonStyle={EButtonStyle.green} />
          <CustomButton text="Стоп" buttonStyle={EButtonStyle.red} />
        </div>
      </div>
    </div>
  );
}
