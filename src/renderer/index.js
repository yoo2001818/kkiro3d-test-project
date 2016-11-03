import Renderer from 'webglue/lib/renderer';
import RendererView from 'kkiro3d/lib/view/renderer';
import mesh from 'kkiro3d/lib/view/renderer/effect/mesh';
import light from 'kkiro3d/lib/view/renderer/effect/light';
import skybox from 'kkiro3d/lib/view/renderer/effect/skybox';
// List of kkiro3d built-in effects. Most of them are for debugging / editing
// purposes though.
/*
import mousePick from 'kkiro3d/lib/view/renderer/effect/mousePick';
import depthPick from 'kkiro3d/lib/view/renderer/effect/depthPick';
import axis from 'kkiro3d/lib/view/renderer/effect/axis';
import widget from 'kkiro3d/lib/view/renderer/effect/widget';
import lightWidget from 'kkiro3d/lib/view/renderer/effect/lightWidget';
import cameraWidget from 'kkiro3d/lib/view/renderer/effect/cameraWidget';
import generalHandle from 'kkiro3d/lib/view/renderer/effect/generalHandle';
import collision from 'kkiro3d/lib/view/renderer/effect/collision';
*/

export default function initView(engine) {
  let canvas = document.createElement('canvas');
  canvas.className = 'engine-canvas';

  let gl = canvas.getContext('webgl', { antialias: true }) ||
    canvas.getContext('experimental-webgl');
  let renderer = new Renderer(gl);

  let rendererView = new RendererView(engine, renderer,
    { mesh, light, skybox }
  );
  rendererView.canvas = canvas;

  canvas.addEventListener('contextmenu', e => e.preventDefault());
  return rendererView;
}
