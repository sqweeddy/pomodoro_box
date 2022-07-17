import React, { useEffect, useRef } from "react";
import styles from "./modal.module.css";

interface IModal {
  setIsModalOpened: (value: React.SetStateAction<boolean>) => void;
  id: string;
  action: (taskId: string) => void;
}

export function Modal({ setIsModalOpened, action, id }: IModal) {
  const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   function handleClick(event: MouseEvent) {
  //     if (
  //       event.target instanceof Node &&
  //       !ref.current?.contains(event.target)
  //     ) {
  //       setIsModalOpened(false);
  //     }
  //   }
  //   document.addEventListener("click", handleClick);
  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   };
  // }, [ref]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={ref}>
        <h2 className={styles.title}>Удалить задачу?</h2>
        <div className={styles.content}>
          <button
            className={styles.deleteBtn}
            onClick={() => {
              action(id);
            }}
          >
            Удалить
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => {
              setIsModalOpened(false);
            }}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
