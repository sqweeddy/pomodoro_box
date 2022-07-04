import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CustomButton, EButtonStyle } from "../../shared/CustomButton";
import styles from "./taskmanager.module.css";

export function TaskManager() {
  const taskArray = useTypedSelector((state) => state.taskReducer.taskArray);

  const [isTimerActive, setTimerActive] = useState(false);
  const [isInitialStart, setInitialStart] = useState(false);
  const [isBreakStart, setBreakStart] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);

  const taskTitle = taskArray[0] ? taskArray[0].name : "Текущая задача";
  const pomodoroDelta = taskArray[0] ? taskArray[0].repeats - 1 : 1;
  const pomodoroNumber = taskArray[0]
    ? taskArray[0].repeats - pomodoroDelta
    : 1;

  const taskNumber = isTimerActive
    ? `Задача${taskArray.indexOf(taskArray[0])}`
    : "Задача 1";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive || isBreakStart) {
      timer = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    }
    if (seconds === 0 && minutes === 0 && !isBreakStart) {
      setTimerActive(false);
      setInitialStart(false);
      setBreakStart(true);
      setMinutes(0);
      setSeconds(5);
    }
    if (seconds === 0 && minutes === 0 && isBreakStart) {
      setTimerActive(false);
      setInitialStart(false);
      setBreakStart(false);
      handleStop();
    }

    return () => clearInterval(timer);
  }, [isBreakStart, isTimerActive, minutes, seconds]);

  function handleStart() {
    setTimerActive(true);
    setInitialStart(true);
  }

  function handleStop() {
    setTimerActive(false);
    setMinutes(25);
    setSeconds(0);
    setInitialStart(false);
  }

  function handlePause() {
    setTimerActive(false);
  }

  return (
    <div className={styles.wrapper}>
      <div className={isInitialStart ? styles.headerRed : styles.header}>
        <div>{taskTitle}</div>
        <div>Помидор {pomodoroNumber}</div>
      </div>
      <div className={styles.main}>
        <div className={isTimerActive ? styles.timerRed : styles.timer}>
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </div>
        <div className={styles.task}>
          <div className={styles.taskNumber}>{taskNumber} - </div>
          <div className={styles.taskName}> {taskTitle}</div>
        </div>
        <div className={styles.buttonBlock}>
          {isTimerActive ? (
            <CustomButton
              text="Пауза"
              buttonStyle={EButtonStyle.green}
              onClick={handlePause}
            />
          ) : (
            <CustomButton
              text={isInitialStart ? "Продолжить" : "Старт"}
              buttonStyle={EButtonStyle.green}
              onClick={handleStart}
            />
          )}
          <CustomButton
            text="Стоп"
            buttonStyle={EButtonStyle.stop}
            onClick={handleStop}
            disabled={isInitialStart ? false : true}
          />
        </div>
      </div>
    </div>
  );
}
