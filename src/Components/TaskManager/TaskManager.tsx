import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CustomButton, EButtonStyle } from "../../shared/CustomButton";
import { ReactComponent as Plus } from "../../images/big-plus-icon.svg";
import styles from "./taskmanager.module.css";

export function TaskManager() {
  const taskArray = useTypedSelector((state) => state.taskReducer.taskArray);

  const [isInitialStart, setInitialStart] = useState(false);
  const [isTimerActive, setTimerActive] = useState(false);
  const [isBreakActive, setBreakActive] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [taskNumber, setTaskNumber] = useState(0);
  const [pomodoroNumber, setPomodoroNumber] = useState(1);
  const [taskTitle, setTaskTitle] = useState("Текущая задача");

  const checkArray = taskArray.length > 0 && taskArray.length > taskNumber;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive) {
      timer = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    }
    if (checkArray) {
      setTaskTitle(taskArray[taskNumber].name);
      if (seconds === 0 && minutes === 0) {
        if (!isBreakActive && isTimerActive) {
          setBreakActive(true);
          setTime();
        } else {
          setBreakActive(false);
          if (taskArray.length !== taskNumber + 1) {
            setTime();
            if (pomodoroNumber !== taskArray[taskNumber].repeats) {
              setPomodoroNumber(pomodoroNumber + 1);
            } else {
              setPomodoroNumber(1);
              setTaskNumber(taskNumber + 1);
            }
          } else {
            setTime();
            if (pomodoroNumber !== taskArray[taskNumber].repeats) {
              setPomodoroNumber(pomodoroNumber + 1);
            } else {
              setTimerActive(false);
              setInitialStart(false);
            }
          }
        }
      }
    } else if (seconds === 0 && minutes === 0) {
      setTimerActive(false);
      setInitialStart(false);
    }

    return () => clearInterval(timer);
  }, [
    checkArray,
    isBreakActive,
    isTimerActive,
    minutes,
    pomodoroNumber,
    seconds,
    taskArray,
    taskNumber,
  ]);

  function handleStart() {
    setTimerActive(true);
    setInitialStart(true);
  }

  function handleStop() {
    setTimerActive(false);
    setTime();
    setInitialStart(false);
  }

  function handlePause() {
    setTimerActive(false);
  }

  function handleSkip() {
    setMinutes(0);
    setSeconds(0);
  }

  function setTime() {
    setMinutes(0);
    setSeconds(5);
  }

  function handlePlus() {
    setSeconds(seconds + 1);
  }

  return (
    <div className={styles.wrapper}>
      {isBreakActive ? (
        <div className={isBreakActive ? styles.headerGreen : styles.header}>
          <div>{taskTitle}</div>
          <div>Помидор {pomodoroNumber}</div>
        </div>
      ) : (
        <div className={isInitialStart ? styles.headerRed : styles.header}>
          <div>{taskTitle}</div>
          <div>Помидор {pomodoroNumber}</div>
        </div>
      )}
      <div className={styles.main}>
        {isBreakActive ? (
          <div className={isTimerActive ? styles.timerGreen : styles.timer}>
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </div>
        ) : (
          <div className={isTimerActive ? styles.timerRed : styles.timer}>
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </div>
        )}
        <div className={styles.task}>
          <div className={styles.taskNumber}>Задача {taskNumber + 1} - </div>
          <div className={styles.taskName}> {taskTitle}</div>
        </div>
        {!isBreakActive ? (
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
        ) : (
          <div className={styles.buttonBlock}>
            {isTimerActive ? (
              <CustomButton
                text="Пауза"
                buttonStyle={EButtonStyle.green}
                onClick={handlePause}
              />
            ) : (
              <CustomButton
                text={"Продолжить"}
                buttonStyle={EButtonStyle.green}
                onClick={handleStart}
              />
            )}
            <CustomButton
              text="Пропустить"
              buttonStyle={EButtonStyle.stop}
              onClick={handleSkip}
              disabled={isInitialStart ? false : true}
            />
          </div>
        )}
        {!isInitialStart && (
          <button className={styles.plus} onClick={handlePlus}>
            <Plus />
          </button>
        )}
      </div>
    </div>
  );
}
