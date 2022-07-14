import React, { useEffect, useRef, useState } from "react";
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
import { Transition } from "react-transition-group";

interface IDropdown {
  id: string;
}

export function Dropdown({ id }: IDropdown) {
  const taskArray = useTypedSelector((state) => state.taskReducer.taskArray);
  const task = taskArray.find((el) => el.id === id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEdit = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsEditOpen(!isEditOpen);
  };

  const handlePlus = () => {
    dispatch(TaskActionCreators.incrementTaskPomodoro(id));
  };

  const handleMinus = () => {
    dispatch(TaskActionCreators.decrementTaskPomodoro(id));
  };

  const handleDelete = () => {
    dispatch(TaskActionCreators.deleteTask(id));
  };

  return (
    <>
      <div>
        <button className={styles.taskItem__btn} onClick={handleOpen}>
          {isDropdownOpen ? (
            <Cross className={styles.crossStyle} />
          ) : (
            <MenuIcon style={{ height: "100%" }} />
          )}
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdown} ref={ref}>
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
                  // onClick={handleEdit}
                  text="Редактировать"
                >
                  <MenuEdit className={styles.menuIcon} />
                </CustomButton>
              </li>
              <li className={styles.menuItem}>
                <CustomButton
                  buttonStyle={EButtonStyle.menu}
                  onClick={handleDelete}
                  text="Удалить"
                >
                  <MenuDelete className={styles.menuIcon} />
                </CustomButton>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* {isEditOpen && <input type="text" />} */}
    </>
  );
}
