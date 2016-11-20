import { vec3 } from 'gl-matrix';

function decodeNormal(data) {
  let output = vec3.create();
  output[0] = data[0] / 255 * 2 - 1;
  output[1] = data[1] / 255 * 2 - 1;
  output[2] = data[2] / 255 * 2 - 1;
  if (Math.abs(output[0]) < 0.1) output[0] = 0;
  if (Math.abs(output[1]) < 0.1) output[1] = 0;
  if (Math.abs(output[2]) < 0.1) output[2] = 0;
  vec3.normalize(output, output);
  return output;
}

export default function depthPickEffect(renderer) {
  const webglue = renderer.webglue;
  const gl = webglue.gl;
  // Create normal pick framebuffer and shader
  let pickShader = webglue.shaders.create(
    require('../shader/encodeNormal.vert'),
    require('../shader/encodeNormal.frag')
  );
  let pickShaderHandler = () => pickShader;
  let pickTexture = webglue.textures.create(null, {
    format: gl.RGB
  });
  let pickFramebuffer = webglue.framebuffers.create({
    color: pickTexture,
    depth: gl.DEPTH_COMPONENT16 // Automatically use renderbuffer
  });
  return {
    pickFramebuffer,
    viewport: (data) => Object.assign(data, {
      options: Object.assign(data.options, {
        clearColor: new Float32Array([0, 0, 0, 1]),
        clearDepth: 1,
        cull: gl.BACK,
        depth: gl.LEQUAL
      }),
      shaderHandler: pickShaderHandler,
      framebuffer: pickFramebuffer
    }),
    pick: function (x, y) {
      // Render normal pick framebuffer.. (using itself as a filter)
      renderer.render(['mesh', 'generalHandle', 'normalPick']);
      // Then extract the pixel from framebuffer
      let pixel = new Uint8Array(4);
      pickFramebuffer.readPixelsRGBA((x - renderer.left),
        pickFramebuffer.height - (y - renderer.top), 1, 1, pixel);
      return decodeNormal(pixel);
    }
  };
}
