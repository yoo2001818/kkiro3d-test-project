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
        let result = this.createEntity(id);
        this.get(id).entity = result.entity.id;
        if (this.getId() === id) {
          this.engine.actions.renderer.camera.set(result.camera);
        }
      },
      'external.start:post@200!': ([isGlobal]) => {
        if (!isGlobal) return;
        // Everybody gets an entity if the player doesn't have one.
        this.engine.systems.network.clients.forEach(id => {
          if (this.get(id).type !== 'game') return;
          let result = this.createEntity(id);
          this.get(id).entity = result.entity.id;
          if (this.getId() === id) {
            this.engine.actions.renderer.camera.set(result.camera);
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
    let camera = null;
    let playerTemplateMod = playerTemplate.slice();
    playerTemplateMod[0] = Object.assign(playerTemplate[0], {
      id: null,
      transform: {
        position: [0, -300, 0]
      },
      networkTemporary: {
        owner: id
      }
    });
    let entity = this.engine.actions.parent.createHierarchy(playerTemplateMod);
    // Find camera...
    const traverseEntity = (entity) => {
      if (entity.camera != null) camera = entity;
      let children = this.engine.systems.parent.getChildren(entity);
      if (children == null) return;
      children.forEach(id => {
        let child = this.engine.state.entities[id];
        traverseEntity(child);
      });
    };
    traverseEntity(entity);
    return { camera: camera, entity: entity };
  }
}
