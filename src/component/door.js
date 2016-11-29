import { signalRaw } from 'fudge';

export default {
  component: {
    open: false
  },
  schema: {
    open: {
      type: 'checkbox'
    },
  },
  actions: {
    set: signalRaw(function ([entity, data]) {
      Object.assign(entity.door, data);
      let parent = this.state.entities[entity.parent];
      if (parent != null) {
        this.actions.animation.set(parent, {
          playing: true,
          duration: entity.door.open ? 2 : 1,
          start: this.state.global.time - (entity.door.open ? 1 : 0),
          repeat: 1
        });
      }
    }),
  }
};
