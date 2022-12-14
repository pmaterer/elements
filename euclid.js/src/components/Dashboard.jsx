import React from "react";
import Vectors from "./Vectors";

const Dashboard = ({
  mouseCoordinates,
  mouseOver,
  segments,
  setSegments,
  removeSegment,
}) => {
  let info;

  if (mouseOver) {
    info = (
      <div>
        <h2>Mouse Coordinates</h2>
        <p>
          Mouse: ({mouseCoordinates.x.toFixed(1)},{" "}
          {mouseCoordinates.y.toFixed(1)})
        </p>
      </div>
    );
  }

  return (
    <div className="pv-1 px-2 flex-shrink-0 flex-grow">
      <h1 className="text-4xl">Euclid</h1>
      <Vectors
        segments={segments}
        setSegments={setSegments}
        removeSegment={removeSegment}
      />
      <div>{info}</div>
    </div>
  );
};

export default Dashboard;
