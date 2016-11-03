import { vec3 } from 'gl-matrix';

let tmpVec = vec3.create();
let tmpVec2 = vec3.create();

function sign(x) {
  if (x > 0) return 1;
  else return -1;
}

export default class PhysicsSystem {
  constructor() {
    this.looped = [];
    this.hooks = {
      'external.update@100!': ([delta]) => {
        this.looped = [];
        this.family.entities.forEach(e => {
          if (e.velocity[1] < -0.05 && e.physics.onGround) {
            this.engine.actions.physics.setOnGround(e, false);
          }
          this.engine.actions.velocity.add(e,
            [0, -Math.min(1/60, delta) * e.physics.gravity, 0]);
        });
      },
      'collision.collide!': ([entity, other, bounds]) => {
        // Don't check collision for physics objects
        if (other.physics != null && entity.physics != null) return;
        // ....
        if (other.physics != null && entity.physics == null) {
          let swp = entity;
          entity = other;
          other = swp;
        }
        if (entity.physics == null) return;
        if (this.looped[entity.id]) return;
        this.looped[entity.id] = true;
        // Test - pushing other object
        vec3.subtract(tmpVec2, bounds.max, bounds.min);
        // Choose biggest one
        let channel = 0;
        if (tmpVec2[channel] > tmpVec2[1]) channel = 1;
        if (tmpVec2[channel] > tmpVec2[2]) channel = 2;
        if (channel !== 0) tmpVec2[0] = 0;
        if (channel !== 1) tmpVec2[1] = 0;
        if (channel !== 2) tmpVec2[2] = 0;
        // Find direction to push
        vec3.subtract(tmpVec, this.engine.systems.collision.getCenter(other),
          this.engine.systems.collision.getCenter(entity));
        // Sign
        tmpVec[0] = -sign(tmpVec[0]);
        tmpVec[1] = -sign(tmpVec[1]);
        tmpVec[2] = -sign(tmpVec[2]);
        // Multiply sign
        vec3.multiply(tmpVec2, tmpVec2, tmpVec);
        this.engine.actions.transform.translate(entity, tmpVec2, true);
        // Stop gravity if pushing upwards
        if (tmpVec2[1] > 0) {
          this.engine.actions.velocity.set(entity,
            [0, 0, 0]);
          this.engine.actions.physics.setOnGround(entity, true);
        }
      }
    };
  }
  attach(engine) {
    this.engine = engine;
    this.family = this.engine.systems.family.get('physics', 'velocity');
  }
}
