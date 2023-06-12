var car_position = 0;
var move_loop;


$('#button_forward').mousedown(function() {
    start_moving_forward();
  });

$('#button_forward').mouseup(function() {
    stop_moving();
  });

$('#button_forward').mouseleave(function() {
    stop_moving();
  });

$('#button_backward').mousedown(function() {
    start_moving_backward();
  });

$('#button_backward').mouseup(function() {
    stop_moving();
  });
$('#button_backward').mouseleave(function() {
    stop_moving();
  });

function move_car(dx) {

  if (dx >= 0) {
    if (car_position >= 298 & car_position < 843 & barrier_position <= 450) {
      console.log("cant move forward")
    } else {
      //car forward movement limit
      if (car_position <=1120) {
        car_position += dx;
        $('#avto').attr('transform',"matrix(-0.49136907,0,0,-0.49136907," + String(1855.2744-car_position) + ",-360.13896)");
      }
    }
  }
  if (dx <= 0) { 
    if (car_position >= 840 & car_position <= 843 & barrier_position <= 450) {
      console.log("cant move backward")
    } else {
      //car backward movement limit
      if (car_position > 0) {
        car_position += dx;
        $('#avto').attr('transform',"matrix(-0.49136907,0,0,-0.49136907," + String(1855.2744-car_position) + ",-360.13896)");
      }
    }
  }
  
  // trigger Magnetic loop
  if (car_position >= 238 & car_position <= 537) {
    sensorObjects.MagneticLoop.activate();
  }
  // release Magnetic loop
  if (car_position > 537 | car_position < 238) {
    sensorObjects.MagneticLoop.deactivate();
  }
  // trigger photo diode
  if (car_position >= 443 & car_position <= 900) {
    sensorObjects.PhotoDiode.deactivate();
  }
  // release photo diode
  if (car_position > 900 | car_position < 443) {
    sensorObjects.PhotoDiode.activate();
  }
}

function start_moving_forward () {
    move_loop = setInterval(function(){
        move_car(1);
    }, 10);
}

function start_moving_backward () {
    move_loop = setInterval(function(){
        move_car(-1);
    }, 10);
}

function stop_moving () {
  clearInterval(move_loop);
}