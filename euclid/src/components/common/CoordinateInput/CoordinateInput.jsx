import React from "react";

import styles from "./CoordinateInput.module.css";

const CoordinateInput = ({ name, coordinate }) => {
  return (
    <div>
      <label className={styles.label} htmlFor={name + coordinate}>
        {coordinate}
      </label>
      <input
        id={name + coordinate}
        className={styles.input}
        type="number"
        placeholder={name == "tip" ? 0 : null}
      />
    </div>
  );
};

export default CoordinateInput;