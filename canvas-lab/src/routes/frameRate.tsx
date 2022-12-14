import React from 'react';
import FrameRate from '../components/FrameRate';

const FrameRateRoute = () => {
  return (
    <>
      <h2>60 FPS</h2>
      <FrameRate width={600} height={350} frameRate={60} />

      <h2>30 FPS</h2>
      <FrameRate width={600} height={350} frameRate={30} />

      <h2>5 FPS</h2>
      <FrameRate width={600} height={350} frameRate={5} />
    </>
  );
};
export default FrameRateRoute;
