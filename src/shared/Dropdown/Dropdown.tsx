import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./dropdown.module.css";
import { ReactComponent as MenuIcon } from "../../images/menu-icon.svg";
import { ReactComponent as MenuPlus } from "../../images/menu-icon-plus.svg";
import { ReactComponent as MenuMinus } from "../../images/menu-icon-minus.svg";
import { ReactComponent as MenuEdit } from "../../images/menu-icon-edit.svg";
import { ReactComponent as MenuDelete } from "../../images/menu-icon-delete.svg";
import { ReactComponent as Cross } from "../../images/big-plus-icon.svg";
import { CustomButton, EButtonStyle } from "../CustomButton";
import { useDispatch } from "react-redux";
import { TaskActionCreators } from "../../store/reducers/task/action-creators";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Modal } from "../../Components/Modal";
import ReactDOM from "react-dom";

interface IDropdown {
  id: string;
}

export function Dropdown({ id }: IDropdown) {
  const taskArray = useTypedSelector((state) => state.taskReducer.taskArray);
  const task = taskArray.find((el) => el.id === id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const portal = document.querySelector("#portal");
  const dispatch = useDispatch();

  // useEffect(() => {
  //   function handleClick(event: MouseEvent) {
  //     if (
  //       event.target instanceof Node &&
  //       !ref.current?.contains(event.target)
  //     ) {
  //       setIsDropdownOpen(!isDropdownOpen);
  //     }
  //   }

  //   const timeout = setTimeout(() => {
  //     document.addEventListener("click", handleClick);
  //   }, 1);

  //   return () => {
  //     clearTimeout(timeout);
  //     document.removeEventListener("click", handleClick);
  //   };
  // }, [isDropdownOpen]);

  const handleOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEdit = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsEditOpen(!isEditOpen);
    if (task) {
      setInputValue(task.name);
    }
  };

  const handlePlus = () => {
    dispatch(TaskActionCreators.incrementTaskPomodoro(id));
  };

  const handleMinus = () => {
    dispatch(TaskActionCreators.decrementTaskPomodoro(id));
  };

  const handleDelete = (taskId: string) => {
    dispatch(TaskActionCreators.deleteTask(taskId));
  };

  const handleSave = () => {
    setIsEditOpen(!isEditOpen);
    if (task) {
      dispatch(TaskActionCreators.editTask(task.id, inputValue));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const openDeleteModal = () => {
    setIsDropdownOpen(false);
    setIsModalOpened(!isModalOpened);
  };
  if (!portal) return null;

  return (
    <>
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
      {isEditOpen && (
        <>
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
        </>
      )}
      <div ref={ref}>
        <button className={styles.taskItem__btn} onClick={handleOpen}>
          {isDropdownOpen ? (
            <Cross className={styles.crossStyle} />
          ) : (
            <MenuIcon style={{ height: "100%" }} />
          )}
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <ul>
              <li className={styles.menuItem}>
                <CustomButton
                  buttonStyle={EButtonStyle.menu}
                  onClick={handlePlus}
                  text="Увеличить"
                >
                  <MenuPlus className={styles.menuIcon} />
                </CustomButton>
              </li>
              <li className={styles.menuItem}>
                <CustomButton
                  buttonStyle={EButtonStyle.menu}
                  onClick={handleMinus}
                  text="Уменьшить"
                  disabled={task?.repeats === 1}
                >
                  <MenuMinus className={styles.menuIcon} />
                </CustomButton>
              </li>
              <li className={styles.menuItem}>
                <CustomButton
                  buttonStyle={EButtonStyle.menu}
                  onClick={handleEdit}
                  text="Редактировать"
                >
                  <MenuEdit className={styles.menuIcon} />
                </CustomButton>
              </li>
              <li className={styles.menuItem}>
                <CustomButton
                  buttonStyle={EButtonStyle.menu}
                  onClick={openDeleteModal}
                  text="Удалить"
                >
                  <MenuDelete className={styles.menuIcon} />
                </CustomButton>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
