import React from "react";
import VectorList from "./VectorList";
import Vec2 from "../Vec2";
import Segment from "../shapes/segment";

const Vectors = ({ segments, setSegments, removeSegment }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    let origin = new Vec2(
      Number(event.target.tipX.value),
      Number(event.target.tipY.value)
    );
    let tip = new Vec2(
      Number(event.target.tailX.value),
      Number(event.target.tailY.value)
    );
    setSegments(new Segment(origin, tip));
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl my-3">Vectors</h2>

      <form onSubmit={handleSubmit} className="p-3">
        {["tip", "tail"].map((loc) => {
          return (
            <fieldset>
              <legend className="text-2xl">
                {loc.charAt(0).toUpperCase() + loc.slice(1)}
              </legend>
              {["x", "y"].map((coord) => {
                return (
                  <div className="border-2 border-blue-800 py-1 px-2 inline-block mb-4 mr-4">
                    <input
                      className="appearance-none outline-none bg-transparent"
                      type="number"
                      id={loc + coord.toUpperCase()}
                      name={loc + coord.toUpperCase()}
                      defaultValue={loc === "tip" ? 0 : null}
                      autoComplete="off"
                    />
                    <label
                      htmlFor={loc + coord.toUpperCase()}
                      className="ml-1 font-bold text-md"
                    >
                      {coord}
                    </label>
                  </div>
                );
              })}
            </fieldset>
          );
        })}
        <button className="py-2 px-4 border-pink-700 border rounded">
          ADD
        </button>
      </form>
      <VectorList segments={segments} removeSegment={removeSegment} />
    </div>
  );
};

export default Vectors;
