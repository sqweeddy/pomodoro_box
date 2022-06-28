import classnames from "classnames";
import React, { ReactNode } from "react";
import styles from "./custombutton.module.css";

export enum EButtonStyle {
  green = "green",
  red = "red",
  menu = "menu",
}

interface ICustomButton {
  text: string;
  buttonStyle: EButtonStyle;
  onClick?: () => void;
  children?: ReactNode;
}

export function CustomButton({
  text,
  buttonStyle,
  onClick,
  children,
}: ICustomButton) {
  const classes = classnames(styles[buttonStyle]);
  return (
    <button className={classes} onClick={onClick}>
      {children}
      {text}
    </button>
  );
}
