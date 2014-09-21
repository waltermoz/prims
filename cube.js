function Cube () {
  var vertices = [
    // x,    y,    z
    // front face (z: +1)
     1.0,  1.0,  1.0, // top right
    -1.0,  1.0,  1.0, // top left
    -1.0, -1.0,  1.0, // bottom left
     1.0, -1.0,  1.0, // bottom right
    // right face (x: +1)
     1.0,  1.0, -1.0, // top right
     1.0,  1.0,  1.0, // top left
     1.0, -1.0,  1.0, // bottom left
     1.0, -1.0, -1.0, // bottom right
    // top face (y: +1)
     1.0,  1.0, -1.0, // top right
    -1.0,  1.0, -1.0, // top left
    -1.0,  1.0,  1.0, // bottom left
     1.0,  1.0,  1.0, // bottom right
    // left face (x: -1)
    -1.0,  1.0,  1.0, // top right
    -1.0,  1.0, -1.0, // top left
    -1.0, -1.0, -1.0, // bottom left
    -1.0, -1.0,  1.0, // bottom right
    // bottom face (y: -1)
     1.0, -1.0,  1.0, // top right
    -1.0, -1.0,  1.0, // top left
    -1.0, -1.0, -1.0, // bottom left
     1.0, -1.0, -1.0, // bottom right
    // back face (x: -1)
    -1.0,  1.0, -1.0, // top right
     1.0,  1.0, -1.0, // top left
     1.0, -1.0, -1.0, // bottom left
    -1.0, -1.0, -1.0  // bottom right
  ];

  var textures = [
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,

    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,

    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,

    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,

    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,

    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,
  ];

  var indices = [
     0,  1,  2,   0,  2,  3,
     4,  5,  6,   4,  6,  7,
     8,  9, 10,   8, 10, 11,
    12, 13, 14,  12, 14, 15,
    16, 17, 18,  16, 18, 19,
    20, 21, 22,  20, 22, 23
  ];

  return {
    vertices: vertices,
    textures: textures,
    indices: indices,
  };
};

