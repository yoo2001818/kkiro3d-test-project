/* eslint-disable */
module.exports = {
  "dirt": {
    "id": 1,
    "transform": {
      "position": [
        0,
        0,
        0
      ],
      "scale": [
        1,
        1,
        1
      ],
      "rotation": [
        0,
        0,
        0,
        1
      ]
    },
    "name": "Dirt",
    "block": {
      "type": "dirt"
    },
    "mesh": {
      "geometry": "box",
      "material": "dirt",
      "visible": true,
      "mirror": false
    },
    "collision": {
      "enabled": true,
      "type": "aabb",
      "center": [
        0,
        0,
        0
      ],
      "size": [
        1,
        1,
        1
      ]
    }
  },
  "grass": {
    "id": 1,
    "transform": {
      "position": [
        0,
        0,
        0
      ],
      "scale": [
        1,
        1,
        1
      ],
      "rotation": [
        0,
        0,
        0,
        1
      ]
    },
    "block": {
      "type": "grass"
    },
    "name": "Grass",
    "mesh": {
      "geometry": "grass",
      "material": "blocks",
      "visible": true,
      "mirror": false
    },
    "collision": {
      "enabled": true,
      "type": "aabb",
      "center": [
        0,
        0,
        0
      ],
      "size": [
        1,
        1,
        1
      ]
    }
  },
  "log": {
    "id": 1,
    "transform": {
      "position": [
        0,
        0,
        0
      ],
      "scale": [
        1,
        1,
        1
      ],
      "rotation": [
        0,
        0,
        0,
        1
      ]
    },
    "name": "Log",
    "block": {
      "type": "log"
    },
    "mesh": {
      "geometry": "log",
      "material": "blocks",
      "visible": true,
      "mirror": false
    },
    "collision": {
      "enabled": true,
      "type": "aabb",
      "center": [
        0,
        0,
        0
      ],
      "size": [
        1,
        1,
        1
      ]
    }
  },
  "leaf": {
    "id": 1,
    "transform": {
      "position": [
        0,
        0,
        0
      ],
      "scale": [
        1,
        1,
        1
      ],
      "rotation": [
        0,
        0,
        0,
        1
      ]
    },
    "name": "Leaf",
    "block": {
      "type": "leaf"
    },
    "mesh": {
      "geometry": "box",
      "material": "leaf",
      "visible": true,
      "mirror": false
    },
    "collision": {
      "enabled": true,
      "type": "aabb",
      "center": [
        0,
        0,
        0
      ],
      "size": [
        1,
        1,
        1
      ]
    }
  },
  "woodPlank": {
    "id": 1,
    "transform": {
      "position": [
        0,
        0,
        0
      ],
      "scale": [
        1,
        1,
        1
      ],
      "rotation": [
        0,
        0,
        0,
        1
      ]
    },
    "name": "WoodPlank",
    "block": {
      "type": "woodPlank"
    },
    "mesh": {
      "geometry": "box",
      "material": "woodPlank",
      "visible": true,
      "mirror": false
    },
    "collision": {
      "enabled": true,
      "type": "aabb",
      "center": [
        0,
        0,
        0
      ],
      "size": [
        1,
        1,
        1
      ]
    }
  },
  "cobble": {
    "id": 1,
    "transform": {
      "position": [
        0,
        0,
        0
      ],
      "scale": [
        1,
        1,
        1
      ],
      "rotation": [
        0,
        0,
        0,
        1
      ]
    },
    "name": "Cobble",
    "block": {
      "type": "cobble"
    },
    "mesh": {
      "geometry": "box",
      "material": "cobble",
      "visible": true,
      "mirror": false
    },
    "collision": {
      "enabled": true,
      "type": "aabb",
      "center": [
        0,
        0,
        0
      ],
      "size": [
        1,
        1,
        1
      ]
    }
  },
  "magicLight": [
    {
      "id": 7,
      "transform": {
        "position": [
          -1.7061396837234497,
          4.111298084259033,
          4.590008735656738
        ],
        "scale": [
          1,
          1,
          1
        ],
        "rotation": [
          0,
          0,
          0,
          1
        ]
      },
      "name": "MagicLight",
      "mesh": {
        "geometry": "box",
        "material": "player",
        "visible": true,
        "mirror": false
      },
      "block": {
        "type": "magicLight"
      },
      "collision": {
        "enabled": true,
        "type": "aabb",
        "center": [
          0,
          0,
          0
        ],
        "size": [
          1,
          1,
          1
        ]
      }
    },
    {
      "id": 5,
      "transform": {
        "position": [
          0,
          0.8620810508728027,
          0
        ],
        "scale": [
          1,
          1,
          1
        ],
        "rotation": [
          0.10015102475881577,
          0.8239386081695557,
          0.15392374992370605,
          -0.5360992550849915
        ]
      },
      "name": "Light",
      "light": {
        "type": "spot",
        "color": "#ffffff",
        "ambient": 0.01,
        "diffuse": 1,
        "specular": 1,
        "attenuation": 0.01,
        "angle": [
          0.9238795325112867,
          0.8870108331782217
        ],
        "shadow": true
      },
      "camera": {
        "type": "persp",
        "near": 0.3,
        "far": 30,
        "fov": 0.9599310885968813,
        "zoom": 1,
        "aspect": 0
      },
      "parent": 0,
      "animation": {
        "playing": true,
        "start": 0,
        "repeat": 0,
        "duration": 8,
        "channels": [
          {
            "channel": "transform.rotation.eulerY",
            "input": [
              0,
              4, 8
            ],
            "output": [
              -10,
              10,
              -10
            ]
          }
        ]
      }
    }
  ],
  "creeper": require('./creeper.json'),
  "danceTeapot": require('./danceTeapot.json'),
  "door": require('./door.json')
}
