import React, { Dispatch, useEffect, useRef, useState } from "react";
import styles from "./dropdown.module.css";
import { ReactComponent as MenuPlus } from "../../images/menu-icon-plus.svg";
import { ReactComponent as MenuMinus } from "../../images/menu-icon-minus.svg";
import { ReactComponent as MenuEdit } from "../../images/menu-icon-edit.svg";
import { ReactComponent as MenuDelete } from "../../images/menu-icon-delete.svg";
import { CustomButton, EButtonStyle } from "../CustomButton";
import { useDispatch } from "react-redux";
import { TaskActionCreators } from "../../store/reducers/task/action-creators";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IDropdown {
  id: string;
  isDropdownOpen: boolean;
  isEditOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  setIsModalOpened: Dispatch<SetStateAction<boolean>>;
  setInputValue: Dispatch<SetStateAction<string>>;
}

export function Dropdown({
  id,
  isDropdownOpen,
  isEditOpen,
  setIsDropdownOpen,
  setIsEditOpen,
  setInputValue,
  setIsModalOpened,
}: IDropdown) {
  const taskArray = useTypedSelector((state) => state.taskReducer.taskArray);
  const task = taskArray.find((el) => el.id === id);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        setIsDropdownOpen(!isDropdownOpen);
      }
    }

    const timeout = setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 1);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", handleClick);
    };
  }, [isDropdownOpen, ref]);

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

  const openDeleteModal = () => {
    setIsDropdownOpen(false);
    setIsModalOpened(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.dropdown}
        ref={ref}
        initial={{ height: 0 }}
        exit={{ height: 0 }}
        style={{ overflow: "hidden" }}
        animate={{ height: "auto" }}
      >
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
      </motion.div>
    </AnimatePresence>
  );
}
