import React, { useState } from "react";
import styles from "./dropdown.module.css";
import { ReactComponent as MenuIcon } from "../../images/menu-icon.svg";
import { ReactComponent as MenuPlus } from "../../images/menu-icon-plus.svg";
import { ReactComponent as MenuMinus } from "../../images/menu-icon-minus.svg";
import { ReactComponent as MenuEdit } from "../../images/menu-icon-edit.svg";
import { ReactComponent as MenuDelete } from "../../images/menu-icon-delete.svg";
import { CustomButton, EButtonStyle } from "../CustomButton";

interface IDropdown {
  id: string;
}

export function Dropdown({ id }: IDropdown) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div>
      <button className={styles.taskItem__btn} onClick={handleOpen}>
        <MenuIcon />
      </button>
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <ul>
            <li className={styles.menuItem}>
              <CustomButton buttonStyle={EButtonStyle.menu} text="Увеличить">
                <MenuPlus className={styles.menuIcon} />
              </CustomButton>
            </li>
            <li className={styles.menuItem}>
              <CustomButton buttonStyle={EButtonStyle.menu} text="Уменьшить">
                <MenuMinus className={styles.menuIcon} />
              </CustomButton>
            </li>
            <li className={styles.menuItem}>
              <CustomButton
                buttonStyle={EButtonStyle.menu}
                text="Редактировать"
              >
                <MenuEdit className={styles.menuIcon} />
              </CustomButton>
            </li>
            <li className={styles.menuItem}>
              <CustomButton buttonStyle={EButtonStyle.menu} text="Удалить">
                <MenuDelete className={styles.menuIcon} />
              </CustomButton>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
