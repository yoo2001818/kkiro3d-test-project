import playerTemplate from '../scene/playerData.json';

// Used to store player data, spawn player entity.
export default class PlayerNetworkSystem {
  constructor() {
    this.hooks = {
      'network.connect:post!': ([id]) => {
        let data = this.get(id);
        if (data.type !== 'game') return;
        // Feel free to add 'default' data for this
        Object.assign(data, {
          entity: -1
        });
        // Create a player for the client
        let entity = this.createEntity(id);
        // this.get(id).entity = entity.id;
        if (this.getId() === id) {
          this.engine.actions.renderer.camera.set(entity);
        }
      },
      'external.start:post@200!': ([isGlobal]) => {
        if (!isGlobal) return;
        // Everybody gets an entity if the player doesn't have one.
        this.engine.systems.network.clients.forEach(id => {
          if (this.get(id).type !== 'game') return;
          let entity = this.createEntity(id);
          // this.get(id).entity = entity.id;
          if (this.getId() === id) {
            this.engine.actions.renderer.camera.set(entity);
          }
        });
      }
    };
  }
  attach(engine) {
    this.engine = engine;
  }
  getId() {
    return this.engine.systems.network.getId();
  }
  getSelf() {
    return this.get(this.getId()) || {};
  }
  get(id) {
    return this.engine.systems.network.getData(id);
  }
  createEntity(id) {
    // Feel free to change this routine - it is used to spawn player object.
    // It MUST contain camera component, as it is used to render the screen too.
    let parent = null;
    let camera = null;
    playerTemplate.forEach(template => {
      let entity = this.engine.actions.entity.create(Object.assign(template, {
        parent: parent,
        id: null,
        networkTemporary: {
          owner: id
        }
      }));
      if (parent == null) {
        parent = entity.id;
      }
      if (entity.camera) camera = entity;
    });
    return camera;
  }
}
