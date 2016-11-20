import box from 'webglue/lib/geom/box';
import cylinder from 'webglue/lib/geom/cylinder';
import calcNormals from 'webglue/lib/geom/calcNormals';
import calcTangents from 'webglue/lib/geom/calcTangents';
import channel from 'webglue/lib/geom/channel';
import loadOBJ from 'webglue/lib/loader/obj';
import boxSides from './geom/boxSides';

// Defines webglue resources to be used
export default {
  geometries: {
    box: calcTangents(calcNormals(box())),
    cylinder: calcTangents(cylinder(16)),
    teapot: channel(loadOBJ(require('./geom/wt-teapot.obj'))),
    grass: calcTangents(calcNormals(boxSides([
      0.252, 0.752, 0.498, 0.752, 0.498, 1.0, 0.252, 1.0,
      0.252, 0.752, 0.498, 0.752, 0.498, 1.0, 0.252, 1.0,
      0.0, 0.752, 0.248, 0.752, 0.248, 1.0, 0.0, 1.0,
      0.0, 0.502, 0.248, 0.502, 0.248, 0.748, 0.0, 0.748,
      0.252, 0.752, 0.498, 0.752, 0.498, 1.0, 0.252, 1.0,
      0.252, 0.752, 0.498, 0.752, 0.498, 1.0, 0.252, 1.0
    ]))),
    log: calcTangents(calcNormals(boxSides([
      0.502, 0.752, 0.748, 0.752, 0.748, 1.0, 0.502, 1.0,
      0.502, 0.752, 0.748, 0.752, 0.748, 1.0, 0.502, 1.0,
      0.752, 0.752, 1.0, 0.752, 1.0, 1.0, 0.752, 1.0,
      0.752, 0.752, 1.0, 0.752, 1.0, 1.0, 0.752, 1.0,
      0.502, 0.752, 0.748, 0.752, 0.748, 1.0, 0.502, 1.0,
      0.502, 0.752, 0.748, 0.752, 0.748, 1.0, 0.502, 1.0
    ]))),
    // Resize should be done by user
    door: calcTangents(calcNormals(boxSides([
      0.752, 0.252, 1.0, 0.252, 1.0, 0.748, 0.752, 0.748,
      0.752, 0.252, 1.0, 0.252, 1.0, 0.748, 0.752, 0.748,
      0.752, 0.252, 0.752, 0.252, 0.752, 0.252, 0.752, 0.252,
      0.752, 0.252, 0.752, 0.252, 0.752, 0.252, 0.752, 0.252,
      0.752, 0.252, 0.752, 0.252, 0.752, 0.252, 0.752, 0.252,
      0.752, 0.252, 0.752, 0.252, 0.752, 0.252, 0.752, 0.252
    ]))),
    // Load OBJ files like this:
    // door: channel(loadOBJ(require('./geom/door.obj')))
  },
  shaders: {
    phong: {
      vert: require('./shader/phong.vert'),
      frag: require('./shader/phong.frag')
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
    blocks: {
      source: require('./texture/blocks.png'),
      params: {
        magFilter: 0x2600,
        minFilter: 0x2600,
        mipmap: false
      }
    },
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
    dirt: {
      shader: 'phong',
      uniforms: {
        uMaterial: {
          ambient: '#aaaaaa',
          diffuse: '#aaaaaa',
          specular: '#444444',
          reflectivity: '#00000000',
          shininess: 90
        },
        uDiffuseMap: 'blocks',
        uTexture: [1/4 - 0.004, 0, 0, 0, 1/4 - 0.004, 0, 0.002, 1/2 + 0.002, 1]
      }
    },
    cobble: {
      shader: 'phong',
      uniforms: {
        uMaterial: {
          ambient: '#aaaaaa',
          diffuse: '#aaaaaa',
          specular: '#444444',
          reflectivity: '#00000000',
          shininess: 90
        },
        uDiffuseMap: 'blocks',
        uTexture: [1/4 - 0.004, 0, 0, 0, 1/4 - 0.004, 0, 1/2 + 0.002,
          1/2 + 0.002, 1]
      }
    },
    woodPlank: {
      shader: 'phong',
      uniforms: {
        uMaterial: {
          ambient: '#aaaaaa',
          diffuse: '#aaaaaa',
          specular: '#444444',
          reflectivity: '#00000000',
          shininess: 90
        },
        uDiffuseMap: 'blocks',
        uTexture: [1/4 - 0.004, 0, 0, 0, 1/4 - 0.004, 0, 1/4 + 0.002,
          1/2 + 0.002, 1]
      }
    },
    blocks: {
      shader: 'phong',
      uniforms: {
        uMaterial: {
          ambient: '#aaaaaa',
          diffuse: '#aaaaaa',
          specular: '#444444',
          reflectivity: '#00000000',
          shininess: 90
        },
        uDiffuseMap: 'blocks',
        uTexture: [1, 0, 0, 0, 1, 0, 0, 0, 1]
      }
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
