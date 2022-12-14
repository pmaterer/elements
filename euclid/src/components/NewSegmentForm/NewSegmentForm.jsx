import React from "react";

import Button from "../common/Button/Button";
import SegmentInput from "../SegmentInput";

import Vec2 from "../../Vec2";
import { Segment } from "../../euclid/shapes";

import styles from "./NewSegmentForm.module.css";



const NewSegmentForm = ({ handleSetSegments }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    let tail = new Vec2(
      Number(event.target.tailx.value),
      Number(event.target.taily.value),
    );
    let tip = new Vec2(
      Number(event.target.tipx.value),
      Number(event.target.tipy.value),
    );

    handleSetSegments(new Segment(tip, tail));
  };

  return (
    <div>
      <h2 className={styles.header}>New Segment</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <SegmentInput name="tip" />
        <SegmentInput name="tail" />

        <Button title="Add" />

      </form>
    </div>
  );
};

export default NewSegmentForm;
