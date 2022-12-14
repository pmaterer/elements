// https://spicyyoghurt.com/tools/easing-functions

const easeLinear = (
  dt: number,
  start: number,
  change: number,
  duration: number
) => {
  return (change * dt) / duration + start;
};

export { easeLinear };
