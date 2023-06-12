var barrier_position = 0;
var barrier_move_loop;


$('#odpri').mousedown(function() {
    barrier_start_moving_forward();
  });

$('#odpri').mouseup(function() {
    barrier_stop_moving();
  });
$('#odpri').mouseleave(function() {
    barrier_stop_moving();
  });

$('#zapri').mousedown(function() {
    barrier_start_moving_backward();
  });

$('#zapri').mouseup(function() {
    barrier_stop_moving();
  });
$('#zapri').mouseleave(function() {
    barrier_stop_moving();
  });

function move_barrier(dy) {
  
  if (dy <= 0 & barrier_position >= 0) {
    barrier_position += dy;
    $('#zapornica').attr('transform',"matrix(1,0,0,1.0815451,-0.66938799," + String(59.261115 + barrier_position) + ")");
  }
  if (barrier_position <= 451 & dy >= 0) {
    barrier_position += dy;
    $('#zapornica').attr('transform',"matrix(1,0,0,1.0815451,-0.66938799," + String(59.261115 + barrier_position) + ")");
  }
  if (barrier_position <= 2) {
    //trigger switch closed
    sensorObjects.SwitchClosed.activate();
  }
  if (barrier_position > 2) {
    //release switch closed
    sensorObjects.SwitchClosed.deactivate();
  }
  if (barrier_position < 450) {
    //trigger switch open
    sensorObjects.SwitchOpen.deactivate();
  }
  if (barrier_position >= 450) {
    //release switch open
    sensorObjects.SwitchOpen.activate();
  }
}

function barrier_start_moving_forward () {
    barrier_move_loop = setInterval(function(){
        move_barrier(2);
    }, 10);
}

function barrier_start_moving_backward () {
    barrier_move_loop = setInterval(function(){
        move_barrier(-2);
    }, 10);
}

function barrier_stop_moving () {
  clearInterval(barrier_move_loop);
}