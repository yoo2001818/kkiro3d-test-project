import box from 'webglue/lib/geom/box';
import cylinder from 'webglue/lib/geom/cylinder';
import calcNormals from 'webglue/lib/geom/calcNormals';
import calcTangents from 'webglue/lib/geom/calcTangents';
import channel from 'webglue/lib/geom/channel';
import loadOBJ from 'webglue/lib/loader/obj';

// Defines webglue resources to be used
export default {
  geometries: {
    box: calcTangents(calcNormals(box())),
    cylinder: calcTangents(cylinder(16)),
    teapot: channel(loadOBJ(require('./geom/wt-teapot.obj')))
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
    skybox: {
      source: [
        require('./texture/front.png'),
        require('./texture/front.png'),
        require('./texture/bottom.png'),
        require('./texture/top.png'),
        require('./texture/front.png'),
        require('./texture/front.png'),
      ]
    }
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
    },
    test2: {
      shader: 'phong',
      uniforms: {
        uMaterial: {
          ambient: '#44b13a',
          diffuse: '#44b13a',
          specular: '#7cb377',
          reflectivity: '#0000000',
          shininess: 90
        }
      }
    },
    player: {
      shader: 'phong',
      uniforms: {
        uMaterial: {
          ambient: '#b47d45',
          diffuse: '#b47d45',
          specular: '#f5b97c',
          reflectivity: '#00000000',
          shininess: 90
        }
      }
    }
  }
};
