import * as scenes from '../scene';

// Used to initialize scene data, and swap them on request.
export default class SceneSystem {
  constructor() {
    this.initialized = false;
    this.hooks = {
      'external.start!': () => {
        if (this.initialized) return;
        this.initialized = true;
        this.engine.actions.external.load(scenes.main);
      }
    };
  }
  attach(engine) {
    this.engine = engine;
  }
  loadScene(scene) {
    this.actions.external.stop(true);
    this.actions.external.load(scenes[scene]);
    this.actions.external.start(true);
  }
}
