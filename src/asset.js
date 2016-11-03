import box from 'webglue/lib/geom/box';
import cylinder from 'webglue/lib/geom/cylinder';
import calcNormals from 'webglue/lib/geom/calcNormals';
import calcTangents from 'webglue/lib/geom/calcTangents';
// import channel from 'webglue/lib/geom/channel';
// import loadOBJ from 'webglue/lib/loader/obj';

// Defines webglue resources to be used
export default {
  geometries: {
    box: calcTangents(calcNormals(box())),
    cylinder: calcTangents(cylinder(16))
    // Load OBJ files like this:
    // door: channel(loadOBJ(require('./geom/door.obj')))
  },
  shaders: {
    phong: {
      vert: require('kkiro3d/lib/shader/phong.vert'),
      frag: require('kkiro3d/lib/shader/phong.frag')
    },
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
    normal: {
      shader: 'normal'
    },
    test: {
      shader: 'phong',
      uniforms: {
        uMaterial: {
          ambient: '#aaaaaa',
          diffuse: '#aaaaaa',
          specular: '#444444',
          reflectivity: '#8c292929',
          shininess: 90
        }
      }
    }
  }
};
