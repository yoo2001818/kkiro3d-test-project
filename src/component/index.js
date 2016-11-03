import { signalRaw } from 'fudge';

// Define components here
export const velocity = {
  component: {
    velocity: [0, 0, 0]
  },
  schema: {
    velocity: {
      type: 'vector'
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
      Object.assign(entity.velocity, data);
    })
  }
};
