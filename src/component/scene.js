import { signalRaw } from 'fudge';

export default {
  actions: {
    load: signalRaw(function ([scene]) {
      this.systems.scene.loadScene(scene);
    })
  }
};
