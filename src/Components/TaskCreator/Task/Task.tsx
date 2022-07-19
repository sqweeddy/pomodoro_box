import React, { ChangeEvent, useState } from "react";
import { Dropdown } from "../../../shared/Dropdown";
import styles from "./task.module.css";
import { ReactComponent as MenuIcon } from "../../../images/menu-icon.svg";
import { ReactComponent as Cross } from "../../../images/big-plus-icon.svg";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { TaskActionCreators } from "../../../store/reducers/task/action-creators";
import ReactDOM from "react-dom";
import { Modal } from "../../Modal";

interface ITask {
  id: string;
  repeats: number;
  name: string;
}

export function Task({ id, repeats, name }: ITask) {
  const taskArray = useTypedSelector((state) => state.taskReducer.taskArray);
  const task = taskArray.find((el) => el.id === id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const portal = document.querySelector("#portal");
  const dispatch = useDispatch();

  const handleSave = () => {
    setIsEditOpen(!isEditOpen);
    if (task) {
      dispatch(TaskActionCreators.editTask(task.id, inputValue));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDelete = (taskId: string) => {
    dispatch(TaskActionCreators.deleteTask(taskId));
  };

  if (!portal) return null;
  return (
    <div className={styles.taskItem} key={id}>
      <div className={styles.taskItem__data}>
        <div className={styles.taskItem__reps}>
          <span>{repeats}</span>
        </div>
        {isEditOpen ? (
          <div>
            <input
              className={styles.input}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              autoFocus
            />
            <button className={styles.btn} onClick={handleSave}>
              Сохранить
            </button>
          </div>
        ) : (
          <span className={styles.taskItem__name}>{name}</span>
        )}
      </div>
      <div>
        <button className={styles.taskItem__btn} onClick={handleOpen}>
          {isDropdownOpen ? (
            <Cross className={styles.crossStyle} />
          ) : (
            <MenuIcon style={{ height: "100%" }} />
          )}
        </button>
        {isDropdownOpen && (
          <Dropdown
            id={id}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            isEditOpen={isEditOpen}
            setIsEditOpen={setIsEditOpen}
            setInputValue={setInputValue}
            setIsModalOpened={setIsModalOpened}
          />
        )}
        {isModalOpened &&
          ReactDOM.createPortal(
            <Modal
              setIsModalOpened={setIsModalOpened}
              isModalOpened={isModalOpened}
              action={handleDelete}
              id={id}
            />,
            portal
          )}
      </div>
    </div>
  );
}
