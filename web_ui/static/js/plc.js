class PLC {
	constructor(PlcSpec) {
	    for (var i in PlcSpec.digital_inputs){
	    	//console.log("setting up ", PlcSpec.digital_inputs[i])
	    }
	    for (var i in PlcSpec.digital_outputs){
	    	//console.log("setting up ", PlcSpec.digital_outputs[i])
	    }
	  }
}


// initiate sensotrts
var plcObj;
function initPlc() {
	$.getJSON( "config/plc.json", function( data ) {
  		plcObj = new PLC(data.plc);
	});
}