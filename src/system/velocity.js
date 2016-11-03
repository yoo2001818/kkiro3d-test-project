import { vec3 } from 'gl-matrix';

let tmpVec = vec3.create();

// Define velocity class
export default class VelocitySystem {
  constructor() {
    this.hooks = {
      // Define signals to listen. Putting ! at the end will make it faster,
      // but it will be called with an array, e.g. callback(args).
      'external.update!': ([delta]) => {
        this.family.entities.forEach(entity => {
          vec3.copy(tmpVec, entity.velocity.velocity);
          vec3.scale(tmpVec, tmpVec, delta);
          this.engine.actions.transform.translate(entity, tmpVec);
        });
      }
      // external.update:post
      // external.update:pre
      // external.*
      // external.*:pre
      // external.*:post
      // external.*:pre@500
    };
  }
  attach(engine) {
    this.engine = engine;
    this.family = engine.systems.family.get('velocity', 'transform');
  }
}
