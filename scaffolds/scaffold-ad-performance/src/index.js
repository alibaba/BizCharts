import ReactDOM from 'react-dom';
import router from './router';

const ICE_CONTAINER = document.getElementById('container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="container"></div> 节点.');
}

ReactDOM.render(router, ICE_CONTAINER);
