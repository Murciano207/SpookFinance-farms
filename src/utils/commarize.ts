export const commarize = (n, p = 2) => {
  const order = Math.floor(Math.log10(n) / 3);
  if (order < 0) {
    return Number(n).toFixed(p);
  }

  const units = ['', 'k', 'M', 'B', 'T'];
  const num = n / 1000 ** order;

  return `${num.toFixed(p)}${units[order]}`;
};
