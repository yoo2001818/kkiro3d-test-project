import blocksData from '../scene/blocks';

export default class BlockSystem {
  constructor() {
    this.types = blocksData;
  }
  attach(engine) {
    this.engine = engine;
  }
}
