"use strict";

function Camera(_pos = [0, 0, 0], _up = [0, 1, 0], _look = [0, 0, 0]) {
    var tquat = quat.create();
    var tmat = mat4.create();
    var tvec = vec3.create();

    function _moveForward(amt) {
        tvec[0] = 0;
        tvec[1] = 0;
        tvec[2] = amt;
        quat.copy(tquat, this.rot);
        quat.invert(tquat, tquat);
        vec3.transformQuat(tvec, tvec, tquat);
        //vec3.transformQuat(tvec, tvec, this.rot);
        vec3.sub(this.pos, this.pos, tvec);
    }

    function _moveBackward(amt) {
        tvec[0] = 0;
        tvec[1] = 0;
        tvec[2] = amt;
        quat.copy(tquat, this.rot);
        quat.invert(tquat, tquat);
        vec3.transformQuat(tvec, tvec, tquat);
        vec3.add(this.pos, this.pos, tvec);
    }

    function _moveUp(amt) {
        tvec[0] = 0;
        tvec[1] = amt;
        tvec[2] = 0;
        quat.copy(tquat, this.rot);
        quat.invert(tquat, tquat);
        vec3.transformQuat(tvec, tvec, tquat);
        vec3.add(this.pos, this.pos, tvec);
    }

    function _moveDown(amt) {
        tvec[0] = 0;
        tvec[1] = amt;
        tvec[2] = 0;
        quat.copy(tquat, this.rot);
        quat.invert(tquat, tquat);
        vec3.transformQuat(tvec, tvec, tquat);
        vec3.sub(this.pos, this.pos, tvec);
    }

    function _strafeLeft(amt) {
        tvec[0] = amt;
        tvec[1] = 0;
        tvec[2] = 0;
        quat.copy(tquat, this.rot);
        quat.invert(tquat, tquat);
        vec3.transformQuat(tvec, tvec, tquat);
        vec3.sub(this.pos, this.pos, tvec);
    }

    function _strafeRight(amt) {
        tvec[0] = amt;
        tvec[1] = 0;
        tvec[2] = 0;
        quat.copy(tquat, this.rot);
        quat.invert(tquat, tquat);
        vec3.transformQuat(tvec, tvec, tquat);
        vec3.add(this.pos, this.pos, tvec);
    }

    function _lookLeft(amt) {
        quat.setAxisAngle(tquat, [0, 1, 0], -amt);
        quat.mul(this.rot, this.rot, tquat);
        quat.normalize(this.rot, this.rot);
    }

    function _lookRight(amt) {
        quat.setAxisAngle(tquat, [0, 1, 0], amt);
        quat.mul(this.rot, this.rot, tquat);
        quat.normalize(this.rot, this.rot);
    }

    function _lookUp(amt) {
        quat.setAxisAngle(tquat, [1, 0, 0], -amt);
        quat.mul(this.rot, tquat, this.rot);
        quat.normalize(this.rot, this.rot);
    }

    function _lookDown(amt) {
        quat.setAxisAngle(tquat, [1, 0, 0], amt);
        quat.mul(this.rot, tquat, this.rot);
        quat.normalize(this.rot, this.rot);
    }

    function _toMat4() {
        tvec[0] = -this.pos[0];
        tvec[1] = -this.pos[1];
        tvec[2] = -this.pos[2];
        mat4.fromQuat(tmat, this.rot);
        mat4.translate(tmat, tmat, tvec);
        return mat4.clone(tmat);
    }

    function _getForward() {
        var fwd = [0, 0, 1];
        vec3.transformQuat(fwd, fwd, this.rot);
        return fwd;
    }

    function _getRight() {
        var right = [1, 0, 0];
        vec3.transformQuat(right, right, this.rot);
        return right;
    }

    function _setPos(pos) {
        this.pos = pos;
    }

    // Calculate rotation
    vec3.normalize(_up, _up); 
    var fwd = vec3.create();
    vec3.sub(fwd, _look, _pos);
    vec3.normalize(fwd, fwd);
    var right = vec3.create();
    vec3.cross(right, fwd, _up);
    vec3.normalize(right, right);
    var rotmat = [
        right[0], _up[0], fwd[0],
        right[1], _up[1], fwd[1],
        right[2], _up[2], fwd[2]
    ];
    var _rot = quat.create();
    quat.fromMat3(_rot, rotmat);
    quat.normalize(_rot, _rot);

    this.pos = _pos,
    this.up = _up,
    this.rot = _rot,
    this.moveForward = _moveForward,
    this.moveBackward = _moveBackward,
    this.strafeLeft = _strafeLeft,
    this.strafeRight = _strafeRight,
    this.lookLeft = _lookLeft,
    this.lookRight = _lookRight,
    this.lookUp = _lookUp,
    this.lookDown = _lookDown,
    this.getForward = _getForward,
    this.getRight = _getRight,
    this.toMat4 = _toMat4;
}
