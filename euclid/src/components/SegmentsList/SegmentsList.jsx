import React from "react";
import SegmentOptions from "./SegmentOptions/SegmentOptions";

import styles from "./SegmentsList.module.css";

const SegmentsList = ({ segments }) => {
  return (
    <div className={styles.container}>
      <h2>Segments</h2>
      <ul className={styles.list}>
        {segments.map((segment) => {
          return (
            <li className={styles.listItem} key={segment.id}>
              <SegmentOptions segment={segment} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SegmentsList;
