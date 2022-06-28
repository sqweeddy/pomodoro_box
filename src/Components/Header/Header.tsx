import React from "react";
import styles from "./header.module.css";
import { ReactComponent as Logo } from "../../images/tomato.svg";
import { ReactComponent as StatsLogo } from "../../images/stats.svg";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <Link className={styles.logoLink} to="/">
            <Logo className={styles.logo} />
            <p className={styles.text}>pomodoro_box</p>
          </Link>
          <Link to="/statistics" className={styles.logoLink}>
            <StatsLogo className={styles.statsLogo} />
            <p className={styles.statsText}>Статистика</p>
          </Link>
        </div>
      </div>
    </header>
  );
}
