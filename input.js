"use strict";

function MovementEvents() {
    // Setup canvas events
    this.mouse_move = false;
    this.mouse_yaw_dx = 0;
    this.mouse_pitch_dy = 0;
    this.forward_down = false;
    this.backward_down = false;
    this.strafe_left_down = false;
    this.strafe_right_down = false;
    this.shift_down = false;
}

function setupInput(canvas, movement_events) {
    canvas.onkeydown = function(evt) {
        var code = evt.keyCode;
        switch (code) {
            case 87: movement_events.forward_down = true; break;
            case 83: movement_events.backward_down = true; break;
            case 65: movement_events.strafe_left_down = true; break;
            case 68: movement_events.strafe_right_down = true; break;
        }
        movement_events.shift_down = evt.shiftKey;
    };

    canvas.onkeyup = function(evt) {
        var code = evt.keyCode;
        switch (code) {
            case 87: movement_events.forward_down = false; break;
            case 83: movement_events.backward_down = false; break;
            case 65: movement_events.strafe_left_down = false; break;
            case 68: movement_events.strafe_right_down = false; break;
        }
        movement_events.shift_down = evt.shiftKey;
    };

    canvas.onmousemove = function(evt) {
        movement_events.mouse_move = true;
        movement_events.mouse_yaw_dx = evt.mozMovementX; // canvas.width;
        movement_events.mouse_pitch_dy = evt.mozMovementY; // canvas.height;
    };

    canvas.onclick = function(evt) {
        canvas.requestPointerLock();
    }

    canvas.requestPointerLock = canvas.requestPointerLock ||
                                canvas.mozRequestPointerLock ||
                                canvas.webkitRequestPointerLock;
}
