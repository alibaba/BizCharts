

const addFuncMap = {
  Chart: 'addChart',
  Coord: 'addCoord',
};



export default class Processor {
  constructor() {
    this.config = {};
  }

  addComponent(name, config) {
    this[addFuncMap[name]](config);
  }

  updateComponent(id, config) {

  }

  deleteComponent(id) {

  }

  createG2Instance() {

  }

  batchedUpdate() {

  }
}
