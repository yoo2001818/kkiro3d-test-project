import { vec3 } from 'gl-matrix';
import { signalRaw } from 'fudge';

export default {
  component: data => data ? new Float32Array(data) : vec3.create(),
  schema: {
    velocity: {
      type: 'vector',
      getValue: (entity) => entity.velocity,
      setValue: (entity, value) => ['velocity.set', entity, value]
    }
  },
  actions: {
    // signalRaw callback's 'this' is engine, so you can use
    // function() {} to access engine scope
    // Like this:
    /*
      signalRaw(function() {
        this.actions.velocity.set(entity, data);
      });
    */
    set: signalRaw(([entity, data]) => {
      vec3.copy(entity.velocity, data);
    }),
    add: signalRaw(([entity, data]) => {
      vec3.add(entity.velocity, entity.velocity, data);
    })
  }
};
