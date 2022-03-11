export function getNow() {
  return new Date().toISOString();
}

export function deadline() {
  return Math.round(new Date().getTime() / 1000) + 30;
}