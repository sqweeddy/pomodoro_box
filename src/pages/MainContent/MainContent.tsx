import React from "react";
import { TaskCreator } from "../../Components/TaskCreator";
import { TaskManager } from "../../Components/TaskManager";
import styles from "./maincontent.module.css";

export function MainContent() {
  return (
    <main>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <div className={styles.title}>
              Ура! Теперь можно начать работать:
            </div>
            <ul className={styles.list}>
              <li>Выберите категорию и напишите название текущей задачи</li>
              <li>Запустите таймер ("помидор")</li>
              <li>Работайте пока "помидор" не прозвонит</li>
              <li>Сделайте короткий перерыв (3-5 минут)</li>
              <li>
                Продолжайте работать «помидор» за «помидором», пока задача не
                будут выполнена. Каждые 4 «помидора» делайте длинный перерыв
                (15-30 минут).
              </li>
            </ul>
            <TaskCreator />
          </div>
          <div className={styles.right}>
            <TaskManager />
          </div>
        </div>
      </div>
    </main>
  );
}
