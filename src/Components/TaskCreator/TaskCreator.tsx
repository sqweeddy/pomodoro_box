import React, { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CustomButton, EButtonStyle } from "../../shared/CustomButton";
import { TaskActionCreators } from "../../store/reducers/task/action-creators";
import styles from "./taskcreator.module.css";
import { nanoid } from "nanoid";
import { Task } from "./Task/Task";
import { motion, AnimatePresence } from "framer-motion";

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

  const taskVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

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

      <ul className={styles.taskList}>
        <AnimatePresence>
          {taskArray.map((task) => (
            <motion.li
              key={task.id}
              initial="hidden"
              variants={taskVariants}
              animate="visible"
              exit="hidden"
              className={styles.taskItem}
            >
              <Task
                id={task.id}
                name={task.name}
                repeats={task.repeats}
                key={task.id}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
}
