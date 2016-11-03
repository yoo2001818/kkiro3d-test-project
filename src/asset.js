import box from 'webglue/lib/geom/box';
import calcNormals from 'webglue/lib/geom/calcNormals';
import calcTangents from 'webglue/lib/geom/calcTangents';
// import channel from 'webglue/lib/geom/channel';
// import loadOBJ from 'webglue/lib/loader/obj';

// Defines webglue resources to be used
export default {
  geometries: {
    box: calcTangents(calcNormals(box()))
    // Load OBJ files like this:
    // door: channel(loadOBJ(require('./geom/door.obj')))
  },
  shaders: {
    normal: {
      vert: require('./shader/normal.vert'),
      frag: require('./shader/normal.frag')
    }
  },
  textures: {
    /* '2': {
      source: require('./texture/2.png')
    } */
  },
  materials: {
    test: {
      shader: 'normal',
      uniforms: {}
    }
  }
};
