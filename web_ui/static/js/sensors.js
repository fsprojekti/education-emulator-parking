"signal": {
  "mqttTopic": "/signals",
  "type": "digital",
  "id": 1
}
//Magnet loop sensor
class Sensor {
  constructor(sensorSpec) {
    this.state = sensorSpec.defaultState;
    this.mqttTopic = sensorSpec.mqttTopic;
    this.id = sensorSpec.id;
    this.colorMap = sensorSpec.gui.stateColorMap;
    this.guiObject = sensorSpec.gui.objectId;
    this.styleAttribute = sensorSpec.gui.styleAttribute;
    this.signalTopic = sensorSpec.signal.mqttTopic;
    this.signalType = sensorSpec.signal.type;
    this.signalId = sensorSpec.signal.id;

    this.init();
  }
  // called when car is over magnetic loop
  activate() {
    if (this.state == 0) {
    	this.state = 1;
    	this.publishStateChange(1);
    	this.updateGUI(1);
    }
  }
  // called when car is not over magnetic loop
  deactivate() {
    if (this.state == 1) {
    	this.state = 0;
    	this.publishStateChange(0);
    	this.updateGUI(0);
    }
  }

  publishStateChange(state) {
  	// mqtt data
  	var data = {
  		"id": this.id,
  		"state": this.state,
  		"timestamp": Date.now()
  	};
  	// publish message
  	mqtt.send(this.mqttTopic,JSON.stringify(data));
  }

  publishSignal() {
    var data = {
      "id": this.signalId,
      "state": this.state,
      "type": this.signalType,
  		"timestamp": Date.now()
  	};
  	// publish message
  	mqtt.send(this.signalTopic,JSON.stringify(data));
  }

  updateGUI(state){
  	//get current style
  	var styleList = $(this.guiObject).attr("style").split(";");
  	// iterate over style strings and change stroke
    for (var i in styleList ){
        if (styleList[i].slice(0,this.styleAttribute.length + 1) === this.styleAttribute + ":"){
            styleList[i] = this.styleAttribute + ":" + this.colorMap[state];
        }
  	}
  	// write new style
  	$(this.guiObject).attr("style", styleList.join(";"));
  }

  init() {
  	//update gui to dafault state
    this.updateGUI(this.state);
    //publish default state to mqtt
    this.publishStateChange(this.state);
  }
}


// initiate sensotrts
var sensorObjects = {};
function initSensors() {
	$.getJSON( "config/sensors.json", function( data ) {
		for (var i in data.sensors) {
  			sensorObjects[data.sensors[i].name] = new Sensor(data.sensors[i]);
  		}
	});
}