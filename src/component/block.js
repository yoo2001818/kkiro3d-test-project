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
      if (Array.isArray(data)) {
        let dataMod = data.slice();
        dataMod[0] = Object.assign(data[0], overrides);
        return this.actions.parent.createHierarchy(dataMod);
      } else {
        return this.actions.entity.create(Object.assign({}, data, overrides));
      }
    }
  }
};
