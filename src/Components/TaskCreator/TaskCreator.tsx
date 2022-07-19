import React, { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CustomButton, EButtonStyle } from "../../shared/CustomButton";
import { TaskActionCreators } from "../../store/reducers/task/action-creators";
import styles from "./taskcreator.module.css";
import { nanoid } from "nanoid";
import { Task } from "./Task/Task";

export function TaskCreator() {
  const taskArray = useTypedSelector((state) => state.taskReducer.taskArray);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (ref.current?.value) {
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
            <Task
              id={task.id}
              name={task.name}
              repeats={task.repeats}
              key={task.id}
            />
          ))}
        </ul>
      )}
    </>
  );
}
