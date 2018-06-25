/**
 * 数据打平
 * @param {*} 原始数据
 * @param {*} 前半小时-前5分钟的 scale
 * @param {*} 最后5分钟的 scale
 * @param {*} 分截点的时间
 */
const mixData = (data, scaleX1, scaleX2, breakTime) => {
  const res = {};
  const errors1 = [];
  const errors2 = [];

  Object.keys(data).forEach((city) => {
    const items = data[city];

    const maxCount = items.reduce((m, n) => (((m < n.value) && (n.status === 0)) ? n.value : m), 0);

    if (items.length === 0) {
      return;
    }

    items.sort((a, b) => (a.timestamp - b.timestamp)); // 按时间排序

    let preNode = null;

    const normalP = items.find(d => d.status === 0);
    let normalValue = normalP ? normalP.value : maxCount; // 第一个正常值

    let errors1_seg = [];
    let errors2_seg = [];

    items.forEach((item, i) => {
      const { timestamp, status, value } = item;

      // 坐标映射
      if (!res[timestamp]) {
        const x = (timestamp >= breakTime) ? scaleX2(timestamp) : scaleX1(timestamp);
        res[timestamp] = { x: Math.floor(x * 10000) / 10000, timestamp, value: 1 };
      }

      // test:
      // if (value > 57 && city === 'hangzhou') { status = 2; }

      let lineValue = null;
      let dashValue = null;
      let areaValue = null;
      let pointValue = null;

      switch (status) {
        case 0:
          lineValue = value;
          dashValue = null;
          areaValue = value;

          normalValue = value; // 重设正常值

          if (errors1_seg.length) {
            // 虚线--实线连接
            // dashValue = lineValue;
            preNode[`${city}Line`] = preNode[`${city}Dash`];
            preNode[`${city}Point`] = preNode[`${city}Dash`]; // 结束点

            // 一个完整的错误段
            const first = errors1_seg[0];
            const last = errors1_seg[errors1_seg.length - 1];


            if (!errors1[city]) {
              errors1[city] = [];
            }
            errors1[city].push({
              seg: errors1_seg,
              x1: first.x,
              y1: first.dashValue,
              x2: last.x,
              // y2: last.dashValue,
              y2: maxCount,
            });

            // preNode.lineValue = preNode.dashValue;
          }

          if (errors2_seg.length) {
            const first2 = errors2_seg[0];
            const last2 = errors2_seg[errors2_seg.length - 1];
            if (!errors2[city]) {
              errors2[city] = [];
            }
            errors2[city].push({
              seg: errors2_seg,
              x1: first2.x,
              y1: first2.lineValue,
              x2: last2.x,
              y2: last2.lineValue,
            });
          }

          if (errors1_seg.length === 1) {
            preNode[`${city}Line`] = preNode[`${city}Dash`];
            preNode[`${city}Dash`] = null;
          }

          // 重置
          errors1_seg = [];
          errors2_seg = [];

          break;
        case 1:
          lineValue = null;
          dashValue = normalValue;
          areaValue = normalValue;

          if (errors1_seg.length === 0) {
            // 开始位置画点
            pointValue = dashValue;
            lineValue = normalValue;
            // preNode[`${city}Dash`] = preNode[`${city}Line`];
          } else if (i === items.length) {
            // 最后一个节点
            // 一个完整的错误段
            const first = errors1_seg[0];
            const last = errors1_seg[errors1_seg.length - 1];

            if (!errors1[city]) {
              errors1[city] = [];
            }
            errors1[city].push({
              seg: errors1_seg,
              x1: first.x,
              y1: first.dashValue,
              x2: last.x,
              y2: last.dashValue,
            });
          }

          errors1_seg.push(item);
          break;
        case 2:
          lineValue = value;
          dashValue = null;
          areaValue = value;

          if (!errors2_seg.length) {
            pointValue = value;
            errors2.push();
          }
          // 整条线都是异常
          if (i === (items.length - 1)) {
            const first2 = errors2_seg[0];
            const last2 = errors2_seg[errors2_seg.length - 1];
            if (!errors2[city]) {
              errors2[city] = [];
            }
            errors2[city].push({
              seg: errors2_seg,
              x1: first2.x,
              y1: first2.lineValue,
              x2: last2.x,
              y2: last2.lineValue,
            });
          }

          errors2_seg.push(item);
          break;
        default:
          break;
      }

      // 赋值
      res[timestamp][`${city}Value`] = value;
      res[timestamp][`${city}Line`] = lineValue;
      res[timestamp][`${city}Area`] = areaValue;
      res[timestamp][`${city}Dash`] = dashValue;
      res[timestamp][`${city}Status`] = status;
      res[timestamp][`${city}Point`] = pointValue;
      // console.log('pointValue', pointValue);

      // item
      Object.assign(item, { lineValue, pointValue, dashValue, areaValue, x: res[timestamp].x });

      preNode = res[timestamp];
    });
  });
  return { mData: Object.keys(res).map(i => res[i]), errors1, errors2 };
};

export default mixData;
