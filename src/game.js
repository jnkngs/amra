/**
 * Created by kangaja on 19.9.2016.
 */
var amra = {};
amra.started = false;

amra.init = function() {
    var systemManager = new SystemManager();
    amra.gamecontroller = new GameController(systemManager);
    //TODO: read json data to init systems
    amra.started = true;
};

amra.start = function() {
    //TODO: timer init is needed and events bound to controller
    console.log('starting');
};
/*
//TODO: find a place for this
window.addEventListener('keydown', amra.gamecontroller.parseInput, false);
*/
