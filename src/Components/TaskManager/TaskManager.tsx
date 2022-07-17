import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CustomButton, EButtonStyle } from "../../shared/CustomButton";
import { ReactComponent as Plus } from "../../images/big-plus-icon.svg";
import styles from "./taskmanager.module.css";
import { useDispatch } from "react-redux";
import { StatsActionCreators } from "../../store/reducers/stats/action-creators";

export function TaskManager() {
  const dispatch = useDispatch();
  const taskArray = useTypedSelector((state) => state.taskReducer.taskArray);

  const [isInitialStart, setInitialStart] = useState(false);
  const [isTimerActive, setTimerActive] = useState(false);
  const [isBreakActive, setBreakActive] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [pomodoroTimer, setPomodoroTimer] = useState(minutes);
  const [taskNumber, setTaskNumber] = useState(0);
  const [taskCounter, setTaskCounter] = useState(0);
  const [pomodoroNumber, setPomodoroNumber] = useState(1);
  const [taskTitle, setTaskTitle] = useState("Текущая задача");

  const checkArray = taskArray.length > 0 && taskArray.length > taskNumber;

  const date = new Date();

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
          setPauseTime(1);
          setTaskCounter((c) => c + 1);
          dispatch(
            StatsActionCreators.addPomodoro(date.getDate(), pomodoroTimer)
          );
          if (taskCounter === 3) {
            setPauseTime(30);
            setTaskCounter(0);
          }
        } else {
          setBreakActive(false);
          dispatch(StatsActionCreators.addPause(date.getDate()));
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
              setTaskNumber(0);
              setPomodoroNumber(1);
            }
          }
        }
      }
    } else if (seconds === 0 && minutes === 0) {
      setTimerActive(false);
      setInitialStart(false);
      setTime();
      dispatch(StatsActionCreators.addPomodoro(date.getDate(), pomodoroTimer));
    }

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    checkArray,
    isBreakActive,
    isTimerActive,
    minutes,
    pomodoroNumber,
    pomodoroTimer,
    seconds,
    taskArray,
    taskNumber,
    taskCounter,
  ]);

  function handleStart() {
    setTimerActive(true);
    setInitialStart(true);
    dispatch(
      StatsActionCreators.setDay({
        monthDay: date.getDate(),
        weekDay: date.getDay(),
        workTime: 0,
        pomodoroNumber: 0,
        pauseTime: 0,
        stopNumber: 0,
      })
    );
  }

  function handleStop() {
    setTimerActive(false);
    setTime();
    setInitialStart(false);
    dispatch(StatsActionCreators.addStop(date.getDate()));
  }

  function handlePause() {
    setTimerActive(false);
  }

  function handleSkip() {
    setMinutes(0);
    setSeconds(0);
    dispatch(StatsActionCreators.skipPause(date.getDate()));
  }

  function setTime() {
    setMinutes(pomodoroTimer);
    setSeconds(0);
  }

  function setPauseTime(time: number) {
    setMinutes(time);
    setSeconds(0);
  }

  function handlePlus() {
    setMinutes(minutes + 1);
    setPomodoroTimer(pomodoroTimer + 1);
  }

  function handleComplete() {
    setMinutes(0);
    setSeconds(0);
    setTimerActive(true);
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
        <div className={styles.timeBlock}>
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
          {!isInitialStart && (
            <button className={styles.plus} onClick={handlePlus}>
              <Plus />
            </button>
          )}
        </div>
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
            {isTimerActive ? (
              <CustomButton
                text="Стоп"
                buttonStyle={EButtonStyle.stop}
                onClick={handleStop}
                disabled={isInitialStart ? false : true}
              />
            ) : (
              <CustomButton
                text={isInitialStart ? "Сделано" : "Стоп"}
                buttonStyle={EButtonStyle.stop}
                onClick={handleComplete}
                disabled={isInitialStart ? false : true}
              />
            )}
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
      </div>
    </div>
  );
}
