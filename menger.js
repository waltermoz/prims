"use strict";

function Menger () {
    var cubeTop = [-1, 1, -1, /**/  1, 1, -1, /**/  1, 1,  1,
                    1, 1,  1, /**/ -1, 1,  1, /**/ -1, 1, -1];
    var cubeBot = [-1, -1, -1, /**/ -1, -1,  1, /**/  1, -1,  1,
                    1, -1,  1, /**/  1, -1, -1, /**/ -1, -1, -1];
    var cubeLeft = [-1, -1, -1, /**/ -1, -1, 1, /**/ -1, 1, 1,
                    -1, 1, 1, /**/ -1, 1, -1, /**/ -1, -1, -1];
    var cubeRight = [1, -1, -1, /**/ 1, 1, -1, /**/ 1, 1, 1,
                     1, 1, 1, /**/ 1, -1, 1, /**/ 1, -1, -1];
    var cubeFront = [-1, -1, -1, /**/ 1, -1, -1, /**/ 1, 1, -1,
                      1,  1, -1, /**/ -1, 1, -1, /**/ -1, -1, -1];
    var cubeBack = [-1, -1, 1, /**/ -1, 1, 1, /**/ 1, 1, 1,
                     1,  1, 1, /**/ 1, -1, 1, /**/ -1, -1, 1];

    var cubeTopNormal = [0,  1,  0];
    var cubeBotNormal = [0, -1,  0];
    var cubeLeftNormal = [-1, 0, 0];
    var cubeRightNormal = [1, 0, 0];
    var cubeBackNormal = [0, 0, 1];
    var cubeFrontNormal = [0, 0, -1];

    function cubeAt(x, y, z, d) {
        var maxCoord = Math.pow(3, d);
        if (x < 0 || x >= maxCoord ||
            y < 0 || y >= maxCoord ||
            z < 0 || z >= maxCoord)
        {
            return false;
        }
        var mx = Math.floor(x % 3);
        var my = Math.floor(y % 3);
        var mz = Math.floor(z % 3);
        if (mx%2 + my%2 + mz%2 >= 2) { return false; }
        mx = Math.floor(x / 3);
        my = Math.floor(y / 3);
        mz = Math.floor(z / 3);
        if (mx%2 + my%2 + mz%2 >= 2) { return false; }
        return true;
    }

    function copyNormals(to, to_idx, from) {
        for (var i = 0; i < from.length; ++i) {
            to[i+to_idx] = from[i];
            to[i+to_idx+3] = from[i];
            to[i+to_idx+6] = from[i];
            to[i+to_idx+9] = from[i];
            to[i+to_idx+12] = from[i];
            to[i+to_idx+15] = from[i];
        }
    }

    function copyScaleOffset(to, to_idx, from, offset, scale) {
        for (var i = 0; i < from.length; ++i) {
            to[i+to_idx] = from[i]*scale + offset[i%3];
        }
        return to_idx + from.length;
    }

    function makeCube(depth, scale) {
        // Max of 20^n cubes, but we'll have less than that
        // 0, 0, 0 is bottom left
        var out_verts = new Array(Math.pow(20*6, depth));
        var out_norms = new Array(Math.pow(20*6, depth));
        var out_idx = 0;
        var maxCoord = Math.pow(3, depth);
        scale = scale / maxCoord;
        var coord_scale = scale*2;
        var coord_offset = Math.floor(maxCoord/2);
        for (var x = 0; x < maxCoord; ++x) {
            var wx = (x-coord_offset)*coord_scale;
            for (var y = 0; y < maxCoord; ++y) {
                var wy = (y-coord_offset)*coord_scale;
                for (var z = 0; z < maxCoord; ++z) {
                    if (!cubeAt(x, y, z, depth)) continue;

                    var wz = (z-coord_offset)*coord_scale;
                    var offset = [wx, wy, wz];
                    // Top
                    if (!cubeAt(x, y+1, z, depth)) {
                        copyNormals(out_norms, out_idx, cubeTopNormal);
                        out_idx = copyScaleOffset(out_verts, out_idx, cubeTop,
                                                  offset, scale);
                    }
                    // Bottom
                    if (!cubeAt(x, y-1, z, depth)) {
                        copyNormals(out_norms, out_idx, cubeBotNormal);
                        out_idx = copyScaleOffset(out_verts, out_idx, cubeBot,
                                                  offset, scale);
                    }
                    // Left
                    if (!cubeAt(x-1, y, z, depth)) {
                        copyNormals(out_norms, out_idx, cubeLeftNormal);
                        out_idx = copyScaleOffset(out_verts, out_idx,
                                                  cubeLeft, offset, scale);
                    }
                    // Right
                    if (!cubeAt(x+1, y, z, depth)) {
                        copyNormals(out_norms, out_idx, cubeRightNormal);
                        out_idx = copyScaleOffset(out_verts, out_idx,
                                                  cubeRight, offset, scale);
                    }
                    // Front
                    if (!cubeAt(x, y, z-1, depth)) {
                        copyNormals(out_norms, out_idx, cubeFrontNormal);
                        out_idx = copyScaleOffset(out_verts, out_idx,
                                                  cubeFront, offset, scale);
                    }
                    // Back
                    if (!cubeAt(x, y, z+1, depth)) {
                        copyNormals(out_norms, out_idx, cubeBackNormal);
                        out_idx = copyScaleOffset(out_verts, out_idx,
                                                  cubeBack, offset, scale);
                    }
                }
            }
        }
        out_verts.length = out_idx;
        out_norms.length = out_idx;
        return [out_verts, out_norms];
    }

    var verts_norms = makeCube(2, 1);
    var vertices = verts_norms[0];
    var normals = verts_norms[1];
    var indices = new Array(vertices.length/3);
    for (var i = 0; i < indices.length; ++i) {
        indices[i] = i;
    }
    return {
        vertices: vertices,
        indices: indices,
        normals: normals,
    };
};
