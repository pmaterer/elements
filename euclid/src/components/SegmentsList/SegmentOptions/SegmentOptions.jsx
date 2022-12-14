import React, { useState } from "react";

import Button from "../../common/Button/Button";
import SegmentInput from "../../SegmentInput"
import styles from "./SegmentOptions.module.css";

const Modal = ({ handleClose, show, segment }) => {
  const showHideClassName = show ? `${styles.modal} ${styles.displayBlock}` : `${styles.modal} ${styles.displayNone}`;

  return (
    <div className={showHideClassName}>
      <div className={styles.modalMain}>
        <h4>ID <span className={styles.id}>{segment.id.split("-")[0]}</span></h4>
        <form>
          <fieldset>
            <legend>Add vector</legend>
            <SegmentInput />
          </fieldset>
        </form>
        <Button onClick={handleClose} title="Close" />
      </div>
    </div>
  )
}

const SegmentOptions = ({ segment }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const showOptions = () => {
    setOptionsOpen(true);
    console.log(`options open: ${optionsOpen}`)
  }

  const closeOptions = () => {
    setOptionsOpen(false);
    console.log(`options open: ${optionsOpen}`)
  }

  return (
    <div className={styles.container}>
      <h4>ID <span className={styles.id}>{segment.id.split("-")[0]}</span></h4>
      <ul className={styles.list}>
        <li>
          Tip: ({segment.v1.x}, {segment.v1.y})
        </li>
        <li>
          Tail: ({segment.v2.x}, {segment.v2.y})
        </li>
      </ul>
      <Modal show={optionsOpen} handleClose={closeOptions} segment={segment}></Modal>
      <Button onClick={showOptions} title="Options" />
    </div>
  );
};

export default SegmentOptions;
