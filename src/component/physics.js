import { signalRaw } from 'fudge';

export default {
  component: {
    onGround: false,
    gravity: 10,
    jump: 6
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
    }
  },
  actions: {
    set: signalRaw(([entity, data]) => {
      Object.assign(entity.physics, data);
    }),
    setOnGround: signalRaw(([entity, data]) => {
      entity.physics.onGround = data;
    }),
    jump: signalRaw(function ([entity]) {
      if (!entity.physics.onGround) return;
      this.actions.physics.setOnGround(entity, false);
      this.actions.velocity.set(entity, [0, entity.physics.jump, 0]);
    })
  }
};
