import { vec3 } from 'gl-matrix';

export default class FPSCameraController {
  constructor(engine, node, keyNode) {
    this.engine = engine;
    this.node = node;
    this.keyNode = keyNode;

    this.mouseX = 0;
    this.mouseY = 0;
    this.keys = [];

    this.registerEvents();
  }
  getCamera() {
    return this.engine.systems.renderer.viewportList[0].camera;
  }
  registerEvents() {
    this.node.addEventListener('click', () => {
      this.node.requestPointerLock = this.node.requestPointerLock ||
                                       this.node.mozRequestPointerLock;
      this.node.requestPointerLock();
    });
    this.node.addEventListener('mousemove', e => {
      if (document.pointerLockElement || document.mozPointerLockElement) {
        let camera = this.getCamera();
        if (camera == null) return;
        if (camera.fps == null) return;
        this.engine.actions.external.execute('fps.addRotation', camera,
          -e.movementY / 400, e.movementX / 400);
        return;
      }
      let mouseX = e.layerX - this.node.width / 2;
      let mouseY = e.layerY - this.node.height / 2;
      this.mouseX = mouseX;
      this.mouseY = mouseY;
    });
    this.keyNode.addEventListener('keydown', e => {
      this.keys[e.keyCode] = true;
    });
    this.keyNode.addEventListener('keyup', e => {
      this.keys[e.keyCode] = false;
    });
    this.engine.signals.external.update.add(delta => {
      this.update(delta);
    });
  }
  update(delta) {
    let camera = this.getCamera();
    if (camera == null) return;
    if (camera.fps == null) return;

    if (!this.node.requestPointerLock && !this.node.mozRequestPointerLock) {
      if (Math.abs(this.mouseX) > 10 || Math.abs(this.mouseY) > 10) {
        this.engine.actions.external.execute('fps.addRotation', camera,
          -Math.sin(this.mouseY / 4000), Math.sin(this.mouseX / 4000));
      }
    }

    let velocity = vec3.create();
    // Now, process the key inputs.
    if (this.keys[38] || this.keys[87]) {
      vec3.add(velocity, velocity, [0, 0, 1]);
    }
    if (this.keys[40] || this.keys[83]) {
      vec3.add(velocity, velocity, [0, 0, -1]);
    }
    /*
    if (this.keys[69]) {
      vec3.add(velocity, velocity, [0, 1, 0]);
    }
    if (this.keys[81]) {
      vec3.add(velocity, velocity, [0, -1, 0]);
    }*/
    if (this.keys[37] || this.keys[65]) {
      vec3.add(velocity, velocity, [1, 0, 0]);
    }
    if (this.keys[39] || this.keys[68]) {
      vec3.add(velocity, velocity, [-1, 0, 0]);
    }
    if (this.keys[32]) {
      let parent = this.engine.state.entities[camera.parent];
      if (parent && parent.physics != null) {
        this.engine.actions.external.execute('physics.jump', parent);
      }
    }
    if (velocity[0] !== 0 || velocity[1] !== 0 || velocity[2] !== 0) {
      this.engine.actions.external.execute('fps.move', camera, velocity, delta);
    }
  }
}
