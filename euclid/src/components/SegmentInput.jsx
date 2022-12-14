import React from "react";

import CoordinateInput from "./common/CoordinateInput/CoordinateInput";

import styles from "./SegmentInput.module.css";

const SegmentInput = ({ name }) => {
  return (
    <fieldset className={styles.fieldset}>

      <legend className={styles.legend}>{name}</legend>
      {["x", "y"].map((coordinate) => {
        return (
          <CoordinateInput
            key={name + coordinate}
            name={name}
            coordinate={coordinate}
          />
        );
      })}
    </fieldset>
  );
};

export default SegmentInput;