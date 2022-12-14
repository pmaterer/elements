import React from "react";

import styles from "./Button.module.css";

const Button = ({ title, onClick }) => {
  return (
    <React.Fragment>
      <button onClick={onClick} className={styles.button}>{title}</button>
    </React.Fragment>
  );
};

export default Button;
