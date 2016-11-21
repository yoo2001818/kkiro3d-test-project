import { signalRaw } from 'fudge';

export default {
  component: {
    onGround: false,
    gravity: 30,
    jump: 13,
    fall: true
  },
  schema: {
    onGround: {
      type: 'checkbox'
    },
    gravity: {
      type: 'number'
    },
    jump: {
      type: 'number'
    },
    fall: {
      type: 'checkbox'
    },
  },
  actions: {
    set: signalRaw(([entity, data]) => {
      Object.assign(entity.physics, data);
    }),
    setOnGround: signalRaw(([entity, data]) => {
      entity.physics.onGround = data;
    }),
    setFall: signalRaw(([entity, data]) => {
      entity.physics.fall = data;
    }),
    jump: signalRaw(function ([entity]) {
      if (!entity.physics.onGround) return;
      this.actions.physics.setOnGround(entity, false);
      this.actions.velocity.set(entity, [0, entity.physics.jump, 0]);
    })
  }
};
