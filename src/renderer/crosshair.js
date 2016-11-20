export default function widgetEffect(renderer) {
  const webglue = renderer.webglue;
  const gl = webglue.gl;
  // Why do we need this :/
  let point = webglue.geometries.create({
    attributes: { aPosition: [[0, 0, 0]] },
    mode: gl.POINTS
  });
  let anchorShader = webglue.shaders.create(
    require('../shader/crosshair.vert'),
    require('../shader/crosshair.frag')
  );
  return {
    world: (data) => {
      // Create model matrix for it too
      data.passes.push({
        options: {
          widget: true
        },
        uniforms: {
          uCross: '#000000',
          uCrossWidth: 1/30,
          uCrossSize: 30,
          uCrossStart: 10/30,
          uResolution: shader =>
            [1 / shader.renderer.width, 1 / shader.renderer.height]
        },
        shader: anchorShader,
        geometry: point
      });
      return data;
    }
  };
}
