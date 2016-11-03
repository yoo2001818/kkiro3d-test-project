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
        let entity;
        let family = this.engine.systems.family.get(
          'camera', 'networkTemporary', 'fps');
        family.entities.forEach(e => {
          let owner = e.networkTemporary.owner;
          if (id === owner) entity = e;
        });
        if (entity == null) {
          entity = this.createEntity(id);
        }
        this.get(id).entity = entity.id;
        if (this.getId() === id) {
          this.engine.actions.renderer.camera.set(entity);
        }
      },
      'entity.delete:pre!': (args) => {
        // Prevent player deletion if being used
        let entity = args[0];
        if (entity == null) return args;
        if (this.isPlayer(entity)) return null;
        return args;
      },
      'external.start:post@200!': ([isGlobal]) => {
        if (!isGlobal) return;
        // Everybody gets an entity if the player doesn't have one.
        let checkArr = [];
        let family = this.engine.systems.family.get(
          'camera', 'networkTemporary', 'fps');
        family.entities.forEach(entity => {
          let owner = entity.networkTemporary.owner;
          checkArr[owner] = entity;
        });
        this.engine.systems.network.clients.forEach(id => {
          if (this.get(id).type !== 'game') return;
          let entity;
          if (checkArr[id] == null) {
            entity = this.createEntity(id);
          } else {
            entity = checkArr[id];
          }
          this.get(id).entity = entity.id;
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
  isPlayer(entity) {
    let notEntity = this.engine.systems.network.clients.every(id => {
      let data = this.get(id);
      return data.player !== entity.id;
    });
    return !notEntity;
  }
  createEntity(id) {
    // Feel free to change this routine - it is used to spawn player object.
    // It MUST contain camera component, as it is used to render the screen too.
    return this.engine.actions.entity.create({
      name: 'Player',
      transform: {
        position: [0, 0, 0]
      },
      camera: {},
      networkTemporary: {
        owner: id
      },
      fps: {}
    });
  }
}
