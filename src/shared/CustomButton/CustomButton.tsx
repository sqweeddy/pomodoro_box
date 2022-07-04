import classnames from "classnames";
import React, { ReactNode } from "react";
import styles from "./custombutton.module.css";

export enum EButtonStyle {
  green = "green",
  red = "red",
  menu = "menu",
  stop = "stop",
}

interface ICustomButton {
  text: string;
  buttonStyle: EButtonStyle;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
}

export function CustomButton({
  text,
  buttonStyle,
  onClick,
  children,
  disabled,
}: ICustomButton) {
  const classes = classnames(styles[buttonStyle]);
  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
      {text}
    </button>
  );
}
