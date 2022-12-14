export function randomRgba(alpha) {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let a = alpha;

  return `rgba(${r},${g},${b},${a})`;
}

export const randomHsl = (huePercent, saturationPercent, lightnessPercent) => {
  const h = Math.floor(Math.random() * huePercent);
  const s = Math.floor(Math.random() * (saturationPercent + 1));
  const l = Math.floor(Math.random() * (lightnessPercent + 1));
  return `hsl(${h},${s}%,${l}%)`;
};
