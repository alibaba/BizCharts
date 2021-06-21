import { isNumber } from "@antv/util";


export default function getElementSize(ele, ctlSize: Record<string,any> = {}) {
  return {
      width: isNumber(ctlSize.width) ? ctlSize.width : ele.clientWidth,
      height: isNumber(ctlSize.height) ?  ctlSize.height : ele.clientHeight,
  };
}
