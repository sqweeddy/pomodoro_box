import React, { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CustomButton, EButtonStyle } from "../../shared/CustomButton";
import { Dropdown } from "../../shared/Dropdown";
import { TaskActionCreators } from "../../store/reducers/task/action-creators";
import styles from "./taskcreator.module.css";
import { nanoid } from "nanoid";

export function TaskCreator() {
  const taskArray = useTypedSelector((state) => state.taskReducer.taskArray);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (ref.current) {
      dispatch(
        TaskActionCreators.setTask({
          name: ref.current.value,
          repeats: 1,
          id: nanoid(),
        })
      );
      ref.current.value = "";
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Название задачи"
          ref={ref}
        />
        <CustomButton text="Добавить" buttonStyle={EButtonStyle.green} />
      </form>
      {taskArray.length > 0 && (
        <ul className={styles.taskList}>
          {taskArray.map((task) => (
            <li className={styles.taskItem} key={task.id}>
              <div className={styles.taskItem__data}>
                <div className={styles.taskItem__reps}>
                  <span>{task.repeats}</span>
                </div>
                <span className={styles.taskItem__name}>{task.name}</span>
              </div>
              <Dropdown id={task.id} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
