import React from "react";

const VectorList = ({ segments, removeSegment }) => {
  const handleRemove = (id) => {
    removeSegment(id);
  };
  return (
    <div className="my-5 border-t-2 border-b-2 py-2 border-yellow-50">
      <ul className="flex flex-wrap">
        {segments.map((segment) => {
          return (
            <li
              key={`${segment.id}`}
              className="border-2 border-blue-500 mx-3 my-1"
            >
              <div className="p-2 flex">
                <div className="flex flex-col">
                  <p className="mx-1">
                    Tip ({segment.v1.x}, {segment.v1.y})
                  </p>
                  <p className="mx-1">
                    Tail ({segment.v2.x}, {segment.v2.y})
                  </p>
                </div>

                <button
                  className="ml-4 border px-2 py-1 border-pink-700 rounded"
                  onClick={() => handleRemove(segment.id)}
                >
                  DELETE
                </button>
                <button className="ml-4 border px-2 py-1 border-pink-700 rounded">
                  OPERATIONS
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default VectorList;
