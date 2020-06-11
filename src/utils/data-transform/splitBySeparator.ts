export default (num, separator=',') => {
  if (typeof num === 'number') {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  }
  return num;
}
