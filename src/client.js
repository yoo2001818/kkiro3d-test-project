// Kkiro3D client initialization code
import './style/index.css';
import { vec3 } from 'gl-matrix';

import asset from './asset';

import createRenderer from './renderer';
import createEngine from './engine';
import RendererSystem from 'kkiro3d/lib/system/renderer';
import createSynchronizer from 'kkiro3d/lib/util/createSynchronizer';
import jsonReplacer from 'kkiro3d/lib/util/jsonReplacer';
import startUpdate from './util/startUpdate';
import FPSController from './util/fpsController';
import download from './util/download';

let engine = createEngine();

// Sets up the renderer
let renderer = createRenderer(engine);
engine.addSystem('renderer', new RendererSystem(renderer, asset,
  ['meshInstanced', 'mesh', 'light', 'lightShadow', 'skybox', 'crosshair']));
// Add renderer canvas to DOM
document.body.appendChild(renderer.canvas);
renderer.canvas.width = document.documentElement.clientWidth;
renderer.canvas.height = document.documentElement.clientHeight;

new FPSController(engine, renderer.canvas, window);

let blocks = ['dirt', 'grass', 'woodPlank', 'cobble', 'log', 'leaf',
  'creeper', 'magicLight', 'danceTeapot', 'door'];
let index = 0;
let displayer = document.createElement('div');
displayer.style.background = '#ffffff';
displayer.style.top = '0';
displayer.style.left = '0';
displayer.style.position = 'fixed';
displayer.style.zIndex = 10000;
displayer.style.fontSize = '1.5em';
displayer.style.padding = '0.3em';
displayer.innerHTML = blocks[index];
document.body.appendChild(displayer);

window.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) index += 1;
  else index -= 1;
  if (index < 0) index = blocks.length - 1;
  if (index >= blocks.length) index = 0;
  displayer.innerHTML = blocks[index];
});

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 16) {
    let player = engine.state.entities[engine.systems.player.getSelf().entity];
    if (player == null) return;
    engine.actions.physics.setFall(player, false);
  }
});

window.addEventListener('keyup', (e) => {
  if (e.keyCode === 16) {
    let player = engine.state.entities[engine.systems.player.getSelf().entity];
    if (player == null) return;
    engine.actions.physics.setFall(player, true);
  }
});

window.addEventListener('click', (e) => {
  if (!document.pointerLockElement && !document.mozPointerLockElement) {
    return;
  }
  if (e.button === 1) {
    if (!e.shiftKey) {
      let data = JSON.stringify(engine.getState(), jsonReplacer, 2);
      download(data, 'scenePlay.json');
      return;
    } else {
      let input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';
      input.click();
      input.addEventListener('change', () => {
        let file = input.files[0];
        var reader = new FileReader();
        reader.onload = e => {
          engine.actions.external.execute('editor.load',
            JSON.parse(e.target.result));
        };
        reader.readAsText(file);
      });
      return;
    }
  }
  // Spawn new block
  let id = renderer.effects.mousePick.pick(
    renderer.canvas.width / 2, renderer.canvas.height / 2);
  let normal = renderer.effects.normalPick.pick(
    renderer.canvas.width / 2, renderer.canvas.height / 2);
  // Get position of the entity
  let entity = engine.state.entities[id];
  if (entity == null) return;
  if (entity.door && e.button === 2) {
    engine.actions.external.execute('door.set', entity, {
      open: !entity.door.open
    });
    return;
  }
  // Traverse to parent while we meet a block
  while (entity != null && entity.block == null) {
    entity = engine.state.entities[entity.parent];
  }
  if (entity == null || entity.block == null) return;
  if (e.button === 2) {
    let pos = engine.systems.matrix.getPosition(entity);
    vec3.scale(normal, normal, 2);
    vec3.add(normal, pos, normal);
    // Make sure the user isn't there
    let player = engine.state.entities[engine.systems.player.getSelf().entity];
    if (player == null) return;
    let playerPos = engine.systems.matrix.getPosition(player);
    if ((pos[0] - 1) <= playerPos[0] && (pos[0] + 1) >= playerPos[0] &&
      (pos[1] - 1) <= playerPos[1] && (pos[1] + 1) >= playerPos[1] &&
      (pos[2] - 1) <= playerPos[2] && (pos[2] + 1) >= playerPos[2]
    ) {
      return;
    }
    // Spawn it at new position..
    engine.actions.external.execute('block.spawn', blocks[index], {
      id: null,
      transform: {
        position: normal
      }
    });
  } else if (e.button === 0) {
    if (entity.block.type === 'bedrock') return;
    engine.actions.external.execute('parent.deleteHierarchy', entity);
  }
});

window.addEventListener('resize', () => {
  renderer.canvas.width = document.documentElement.clientWidth;
  renderer.canvas.height = document.documentElement.clientHeight;
});

engine.systems.network.connectHandler = createSynchronizer.bind(null, 'game');
engine.systems.network.offlineMeta = {
  type: 'game'
};

engine.start();

// If hash is provided, try to connect to that server
if (location.hash) {
  engine.systems.network.connect(location.hash.slice(1));
}

startUpdate(engine);
