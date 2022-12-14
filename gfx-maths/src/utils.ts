// https://floating-point-gui.de/errors/comparison/
export const nearlyEquals = (
  a: number,
  b: number,
  epsilon = 0.00001
): boolean => {
  const absA = Math.abs(a);
  const absB = Math.abs(b);
  const diff = Math.abs(a - b);

  if (a === b) {
    return true;
  } else if (a === 0 || b === 0 || absA + absB < Number.MIN_VALUE) {
    return diff < epsilon * Number.MIN_VALUE;
  } else {
    return diff / Math.min(absA + absB, Number.MAX_VALUE) < epsilon;
  }
};
