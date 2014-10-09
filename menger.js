"use strict";

function Menger () {
    var cubeTop =   [-1,  1, -1, /**/  1,  1, -1, /**/  1,  1,  1,
                      1,  1,  1, /**/ -1,  1,  1, /**/ -1,  1, -1];
    var cubeBot =   [-1, -1, -1, /**/ -1, -1,  1, /**/  1, -1,  1,
                      1, -1,  1, /**/  1, -1, -1, /**/ -1, -1, -1];
    var cubeLeft =  [-1, -1, -1, /**/ -1, -1,  1, /**/ -1,  1,  1,
                     -1,  1,  1, /**/ -1,  1, -1, /**/ -1, -1, -1];
    var cubeRight = [ 1, -1, -1, /**/  1,  1, -1, /**/  1,  1,  1,
                      1,  1,  1, /**/  1, -1,  1, /**/  1, -1, -1];
    var cubeFront = [-1, -1, -1, /**/  1, -1, -1, /**/  1,  1, -1,
                      1,  1, -1, /**/ -1,  1, -1, /**/ -1, -1, -1];
    var cubeBack  = [-1, -1,  1, /**/ -1,  1,  1, /**/  1,  1,  1,
                      1,  1,  1, /**/  1, -1,  1, /**/ -1, -1,  1];

    var cubeTopNormal  = [0,  1, 0];
    var cubeBotNormal  = [0, -1, 0];
    var cubeBackNormal = [0,  0, 1];
    var cubeLeftNormal =  [-1, 0,  0];
    var cubeRightNormal = [ 1, 0,  0];
    var cubeFrontNormal = [ 0, 0, -1];

    function cubeAt(x, y, z, d) {
        var maxCoord = Math.pow(3, d);
        if (x < 0 || x >= maxCoord ||
            y < 0 || y >= maxCoord ||
            z < 0 || z >= maxCoord)
        {
            return false;
        }
        var maxCoordDiv3 = Math.floor(maxCoord / 3);
        for (var cd = 1; cd <= d; ++cd) {
            var tx = Math.floor(x / maxCoordDiv3);
            var ty = Math.floor(y / maxCoordDiv3);
            var tz = Math.floor(z / maxCoordDiv3);
            if (tx%2 + ty%2 + tz%2 >= 2) return false;
            x = x % maxCoordDiv3;
            y = y % maxCoordDiv3;
            z = z % maxCoordDiv3;
            maxCoordDiv3 = Math.floor(maxCoordDiv3 / 3);
        }
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

    function calcNumFloats(depth) {
        if (depth < 0) return 0;

        return (2*Math.pow(20, depth) + 4*Math.pow(8, depth))*18;
    }

    function makeCube(depth, scale) {
        var arr_length = calcNumFloats(depth);
        var out_verts = new Float32Array(arr_length);
        var out_norms = new Float32Array(arr_length);
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
        return [out_verts, out_norms];
    }

    var verts_norms = makeCube(4, 4);
    var vertices = verts_norms[0];
    var normals = verts_norms[1];
    return {
        vertices: vertices,
        normals: normals,
    };
};
