import blocksData from '../scene/blocks.json';

export default class BlockSystem {
  constructor() {
    this.types = blocksData;
  }
  attach(engine) {
    this.engine = engine;
  }
}
