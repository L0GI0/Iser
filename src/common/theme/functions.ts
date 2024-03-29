// ----------------------------------------------------------------------

export function linearGradient(color: string, colorState: string, angle = 310) {
  return `linear-gradient(${angle}deg, ${color}, ${colorState})`;
}

export function pxToRem(value: number): string {
  return `${value / 16}rem`;
}