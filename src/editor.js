// Kkiro3D editor initialization code

import 'kkiro3d/lib/style/index.css';

import asset from './asset';

import createView from 'kkiro3d/lib/view';
import createEngine from './engine';
import RendererSystem from 'kkiro3d/lib/system/renderer';
import createSynchronizer from 'kkiro3d/lib/util/createSynchronizer';
import startUpdate from './util/startUpdate';

let engine = createEngine();

// Sets up the editor UI
let renderer = createView(engine);
engine.addSystem('renderer', new RendererSystem(renderer, asset,
  ['mesh', 'light', 'selectWireframe', 'widget',
    'lightWidget', 'cameraWidget', 'generalHandle', 'skybox', 'collision']));

engine.systems.network.connectHandler = createSynchronizer.bind(null, 'editor');
engine.systems.network.offlineMeta = {
  type: 'editor'
};

engine.start();

startUpdate(engine);
