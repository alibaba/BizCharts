export default (num, decimal = 2) => {
  const wan = 10000;
  const yi = 100000000;
  if (num >= yi) {
    return `${(num / yi).toFixed(decimal).replace(/\.?0*$/, '')}\u4EBF`;
  }
  if (num >= wan) {
    return `${(num / wan).toFixed(decimal).replace(/\.?0*$/, '')}\u4E07`;
  }
  return num.toFixed(decimal).replace(/\.?0*$/, '');
}
