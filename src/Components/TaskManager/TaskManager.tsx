import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CustomButton, EButtonStyle } from "../../shared/CustomButton";
import styles from "./taskmanager.module.css";

export function TaskManager() {
  const taskArray = useTypedSelector((state) => state.taskReducer.taskArray);
  const taskTitle = taskArray[0] ? taskArray[0].name : "Текущая задача";

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>{taskTitle}</div>
        <div>pomodoro counter</div>
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
