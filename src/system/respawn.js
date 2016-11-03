export default class RespawnSystem {
  constructor() {
    this.hooks = {
      'external.update@100!': () => {
        this.family.entities.forEach(e => {
          if (e.transform.position[1] < -30)  {
            this.engine.actions.velocity.set(e,
              [0, 0, 0]);
            this.engine.actions.transform.setPosition(e, [0, 5, 0]);
          }
        });
      },
    };
  }
  attach(engine) {
    this.engine = engine;
    this.family = this.engine.systems.family.get('physics', 'velocity',
      'transform');
  }
}
