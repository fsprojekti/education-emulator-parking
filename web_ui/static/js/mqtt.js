var host = 'localhost';
var port = 8888;
var topic = '#';
var useTLS = false;
var cleansession = true;
var mqtt;
var reconnectTimeout = 2000;

function MQTTconnect() {
    path = "/mqtt"
    mqtt = new Paho.MQTT.Client(host, port, path, "webUI" + parseInt(Math.random() * 100, 10));
    var options = {
        timeout: 3,
        useSSL: false,
        cleanSession: cleansession,
        userName: "webUI",
        password: "Iddf=544310941",
        onSuccess: onConnect,
        onFailure: function (message) {
            $('#status').html("Connection failed: " + message.errorMessage + "Retrying...");
            setTimeout(MQTTconnect, reconnectTimeout);
        }
    };

    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;
    console.log("Host: "+ host + ", Port: " + port + ", Path: " + path + " TLS: " + useTLS);
    mqtt.connect(options);
};

function onConnect() {
    $('#status').html('Connected to ' + host + ':' + port + path);
    //subscribe to plc status topic
    mqtt.subscribe(topic, {qos: 0});

    initSensors();
    initPlc()
};

function onConnectionLost(responseObject) {
    setTimeout(MQTTconnect, reconnectTimeout);
    $('#status').html("Connection lost: " + responseObject.errorMessage + ". Reconnecting...");
};

function onMessageArrived(message) {
    var topic = message.destinationName;
    var payload = message.payloadString;
    console.log("Topic: " + topic + ", Message payload: " + payload);
    $('#message').html(topic + ', ' + payload);
    
    switch (topic) {
        case "/plc/#":
            
            break;
        default:
            // statements_def
            break;
    }
};
