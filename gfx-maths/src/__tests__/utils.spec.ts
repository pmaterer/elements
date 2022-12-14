import { nearlyEquals } from '../utils';

test('regular large numbers', () => {
  expect(nearlyEquals(1000000, 1000001)).toBeTruthy();
  expect(nearlyEquals(1000001, 1000000)).toBeTruthy();

  expect(nearlyEquals(10000, 10001)).toBeFalsy();
  expect(nearlyEquals(10001, 10000)).toBeFalsy();
});

test('regular large negative numbers', () => {
  expect(nearlyEquals(-1000000, -1000001)).toBeTruthy();
  expect(nearlyEquals(-1000001, -1000000)).toBeTruthy();

  expect(nearlyEquals(-10000, -10001)).toBeFalsy();
  expect(nearlyEquals(-10001, -10000)).toBeFalsy();
});

test('numbers around 1', () => {
  expect(nearlyEquals(1.0000001, 1.0000002)).toBeTruthy();
  expect(nearlyEquals(1.0000002, 1.0000001)).toBeTruthy();

  expect(nearlyEquals(1.0002, 1.0001)).toBeFalsy();
  expect(nearlyEquals(1.0001, 1.0002)).toBeFalsy();
});

test('numbers around -1', () => {
  expect(nearlyEquals(-1.000001, -1.000002)).toBeTruthy();
  expect(nearlyEquals(-1.000002, -1.000001)).toBeTruthy();

  expect(nearlyEquals(-1.0001, -1.0002)).toBeFalsy();
  expect(nearlyEquals(-1.0002, -1.0001)).toBeFalsy();
});

test('numbers between 1 and 0', () => {
  expect(nearlyEquals(0.000000001000001, 0.000000001000002)).toBeTruthy();
  expect(nearlyEquals(0.000000001000002, 0.000000001000001)).toBeTruthy();

  expect(nearlyEquals(0.000000000001002, 0.000000000001001)).toBeFalsy();
  expect(nearlyEquals(0.000000000001001, 0.000000000001002)).toBeFalsy();
});

test('numbers between -1 and 0', () => {
  expect(nearlyEquals(-0.000000001000001, -0.000000001000002)).toBeTruthy();
  expect(nearlyEquals(-0.000000001000002, -0.000000001000001)).toBeTruthy();

  expect(nearlyEquals(-0.000000000001002, -0.000000000001001)).toBeFalsy();
  expect(nearlyEquals(-0.000000000001001, -0.000000000001002)).toBeFalsy();
});

test('small differences away from zero', () => {
  expect(nearlyEquals(0.3, 0.30000003)).toBeTruthy();
  expect(nearlyEquals(-0.3, -0.30000003)).toBeTruthy();
});

test('comparisons with zero', () => {
  expect(nearlyEquals(0.0, 0.0)).toBeTruthy();
  expect(nearlyEquals(0.0, -0.0)).toBeTruthy();
  expect(nearlyEquals(-0.0, -0.0)).toBeTruthy();

  expect(nearlyEquals(0.00000001, 0.0)).toBeFalsy();
  expect(nearlyEquals(0.0, 0.00000001)).toBeFalsy();
  expect(nearlyEquals(-0.00000001, 0.0)).toBeFalsy();
  expect(nearlyEquals(0.0, -0.00000001)).toBeFalsy();

  //   expect(nearlyEquals(0.0, 1e-40, 0.01)).toBeTruthy();
  //   expect(nearlyEquals(1e-40, 0.0, 0.01)).toBeTruthy();

  expect(nearlyEquals(1e-40, 0.0, 0.000001)).toBeFalsy();
  expect(nearlyEquals(0.0, 1e-40, 0.000001)).toBeFalsy();

  //   expect(nearlyEquals(0.0, -1e-40, 0.1)).toBeTruthy();
  //   expect(nearlyEquals(-1e-40, 0.0, 0.1)).toBeTruthy();

  expect(nearlyEquals(-1e-40, 0.0, 0.00000001)).toBeFalsy();
  expect(nearlyEquals(0.0, -1e-40, 0.00000001)).toBeFalsy();
});

test('comparisons with extreme values', () => {
  expect(nearlyEquals(Number.MAX_VALUE, Number.MAX_VALUE)).toBeTruthy();

  expect(nearlyEquals(Number.MAX_VALUE, -Number.MAX_VALUE)).toBeFalsy();
  expect(nearlyEquals(-Number.MAX_VALUE, Number.MAX_VALUE)).toBeFalsy();

  expect(nearlyEquals(Number.MAX_VALUE, Number.MAX_VALUE / 2)).toBeFalsy();
  expect(nearlyEquals(Number.MAX_VALUE, -Number.MAX_VALUE / 2)).toBeFalsy();
  expect(nearlyEquals(-Number.MAX_VALUE, Number.MAX_VALUE / 2)).toBeFalsy();
});

test('comparisons with infinities', () => {
  expect(
    nearlyEquals(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)
  ).toBeTruthy();
  expect(
    nearlyEquals(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY)
  ).toBeTruthy();

  expect(
    nearlyEquals(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)
  ).toBeFalsy();
  expect(nearlyEquals(Number.POSITIVE_INFINITY, Number.MAX_VALUE)).toBeFalsy();
  expect(nearlyEquals(Number.NEGATIVE_INFINITY, -Number.MAX_VALUE)).toBeFalsy();
});

test('comparisons NaN', () => {
  expect(nearlyEquals(NaN, NaN)).toBeFalsy();
  expect(nearlyEquals(NaN, 0.0)).toBeFalsy();
  expect(nearlyEquals(-0.0, NaN)).toBeFalsy();
  expect(nearlyEquals(NaN, -0.0)).toBeFalsy();
  expect(nearlyEquals(0.0, NaN)).toBeFalsy();

  expect(nearlyEquals(NaN, Number.POSITIVE_INFINITY)).toBeFalsy();
  expect(nearlyEquals(Number.POSITIVE_INFINITY, NaN)).toBeFalsy();
  expect(nearlyEquals(NaN, Number.NEGATIVE_INFINITY)).toBeFalsy();
  expect(nearlyEquals(Number.NEGATIVE_INFINITY, NaN)).toBeFalsy();
  expect(nearlyEquals(NaN, Number.MAX_VALUE)).toBeFalsy();
  expect(nearlyEquals(Number.MAX_VALUE, NaN)).toBeFalsy();
  expect(nearlyEquals(NaN, -Number.MAX_VALUE)).toBeFalsy();
  expect(nearlyEquals(-Number.MAX_VALUE, NaN)).toBeFalsy();
  expect(nearlyEquals(NaN, Number.MIN_VALUE)).toBeFalsy();
  expect(nearlyEquals(Number.MIN_VALUE, NaN)).toBeFalsy();
  expect(nearlyEquals(NaN, -Number.MIN_VALUE)).toBeFalsy();
  expect(nearlyEquals(-Number.MIN_VALUE, NaN)).toBeFalsy();
});

test('Comparisons of numbers on opposite sides of 0', () => {
  expect(nearlyEquals(1.000000001, -1.0)).toBeFalsy();
  expect(nearlyEquals(-1.0, 1.000000001)).toBeFalsy();
  expect(nearlyEquals(-1.000000001, 1.0)).toBeFalsy();
  expect(nearlyEquals(1.0, -1.000000001)).toBeFalsy();
  //   expect(
  //     nearlyEquals(10 * Number.MIN_VALUE, 10 * -Number.MIN_VALUE)
  //   ).toBeTruthy();
  expect(
    nearlyEquals(10000 * Number.MIN_VALUE, 10000 * -Number.MIN_VALUE)
  ).toBeFalsy();
});

test('Comparisons of numbers very close to zero', () => {
  expect(nearlyEquals(Number.MIN_VALUE, Number.MIN_VALUE)).toBeTruthy();
  //   expect(nearlyEquals(Number.MIN_VALUE, -Number.MIN_VALUE)).toBeTruthy();
  //   expect(nearlyEquals(-Number.MIN_VALUE, Number.MIN_VALUE)).toBeTruthy();
  //   expect(nearlyEquals(Number.MIN_VALUE, 0)).toBeTruthy();
  //   expect(nearlyEquals(0, Number.MIN_VALUE)).toBeTruthy();
  //   expect(nearlyEquals(-Number.MIN_VALUE, 0)).toBeTruthy();
  //   expect(nearlyEquals(0, -Number.MIN_VALUE)).toBeTruthy();

  expect(nearlyEquals(0.000000001, -Number.MIN_VALUE)).toBeFalsy();
  expect(nearlyEquals(0.000000001, Number.MIN_VALUE)).toBeFalsy();
  expect(nearlyEquals(Number.MIN_VALUE, 0.000000001)).toBeFalsy();
  expect(nearlyEquals(-Number.MIN_VALUE, 0.000000001)).toBeFalsy();
});
