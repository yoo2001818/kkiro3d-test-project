import { signalRaw } from 'fudge';

export default {
  component: {
    type: 'dirt'
  },
  schema: {
    type: {
      type: 'string'
    }
  },
  actions: {
    set: signalRaw(([entity, data]) => {
      Object.assign(entity.block, data);
    }),
    spawn: function (type, overrides) {
      let data = this.systems.block.types[type];
      if (data == null) return;
      return this.actions.entity.create(Object.assign({}, data, overrides));
    }
  }
};
