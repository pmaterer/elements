import React from "react";

const MouseCoordinates = ({ mouseCoordinates }) => {
  return (
    <div>
      <h3>Mouse Coordinates</h3>
      <p>
        ( {mouseCoordinates ? mouseCoordinates.x.toFixed(1) : 0}
        {", "}
        {mouseCoordinates ? mouseCoordinates.y.toFixed(1) : 0} )
      </p>
    </div>
  );
};

export default MouseCoordinates;
