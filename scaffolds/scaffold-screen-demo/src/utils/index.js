const formatterNumber = (num) => {
  if (typeof num === 'number') {
    const b = parseInt(num, 10).toString();
    const len = b.length;
    if (len <= 3) {
      return b;
    }
    const r = len % 3;
    return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(","); // eslint-disable-line
  } else {
    // 容错
    return '-';
  }
};

export default {
  formatterNumber,
};
