// Kkiro3D client initialization code
import './style/index.css';

import asset from './asset';

import createRenderer from './renderer';
import createEngine from './engine';
import RendererSystem from 'kkiro3d/lib/system/renderer';
import createSynchronizer from 'kkiro3d/lib/util/createSynchronizer';
import startUpdate from './util/startUpdate';

let engine = createEngine();

// Sets up the renderer
let renderer = createRenderer(engine);
engine.addSystem('renderer', new RendererSystem(renderer, asset,
  ['mesh', 'light', 'skybox']));
// Add renderer canvas to DOM
document.body.appendChild(renderer.canvas);
renderer.canvas.width = document.documentElement.clientWidth;
renderer.canvas.height = document.documentElement.clientHeight;

window.addEventListener('resize', () => {
  renderer.canvas.width = document.documentElement.clientWidth;
  renderer.canvas.height = document.documentElement.clientHeight;
});

engine.systems.network.connectHandler = createSynchronizer.bind(null, 'game');
engine.systems.network.offlineMeta = {
  type: 'game'
};

engine.start();

engine.systems.network.connect('ws://localhost:23482');

startUpdate(engine);
