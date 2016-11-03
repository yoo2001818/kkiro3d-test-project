import { vec3 } from 'gl-matrix';
import { signalRaw } from 'fudge';

let tmpVec = vec3.create();

export default {
  component: {
    pitch: 0,
    yaw: 0,
    speed: 8.0
  },
  schema: {
    pitch: {
      type: 'number'
    },
    yaw: {
      type: 'number'
    },
    speed: {
      type: 'number'
    }
  },
  actions: {
    set: signalRaw(([entity, data]) => {
      Object.assign(entity.fps, data);
    }),
    move: signalRaw(function ([entity, vec, delta]) {
      // Get matrix value
      let matrix = this.systems.fps.getMatrix(entity);
      vec3.transformMat3(tmpVec, vec, matrix);
      vec3.scale(tmpVec, tmpVec, entity.fps.speed);
      vec3.scale(tmpVec, tmpVec, delta);
      this.actions.transform.translate(entity, tmpVec);
    })
  }
};
