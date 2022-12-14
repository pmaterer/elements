import React from "react";

import NewSegmentForm from "./NewSegmentForm/NewSegmentForm";
import SegmentsList from "./SegmentsList/SegmentsList";

import styles from "./Controls.module.css";

const Controls = ({ segments, handleSetSegments, mouseCoordinates }) => {
  return (
    <div className={styles.container}>
      <NewSegmentForm handleSetSegments={handleSetSegments} />
      <SegmentsList segments={segments} />
    </div>
  );
};

export default Controls;
