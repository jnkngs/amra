// testing for screens and keyboard controller

var Observable = function () {
    this._observers = [];
    this.registerObserver = function(observer) {
        this._observers.push(observer);
    };
    this.notifyObservers = function(args) {
        for(var i = 0; i < this._observers.length; i++) {
            this._observers[i].notify(args);
        }
    };
};

var Observer = function (params) {
    this.notify = function(args) {
        console.log('default implementation');
    };
};

var System = function(priority) {
    this._priority = priority;
    this.update = function() {};
};

var SystemManager = function(systems) {
    this._systems = systems;
    this.update = function(args) {
        //TODO: refactor for priority
        for (var i = 0; i<this._systems.length; i++) {
            console.log(' Entering systemManager update with ', this._systems[i]);
            this._systems[i].update(args);
        }
    };
};
SystemManager.prototype = new Observer();
SystemManager.prototype.notify = function(args){
  console.log('* SystemManager starting system updates...');
  this.update(args);
};

/*
 * Sample system(s)
 */

function MovementSystem() {
    this._id = 'Movement system';
};
MovementSystem.prototype = new System();
MovementSystem.prototype.update = function(args){
  console.log(this._id, '--> got command: ', args);
};

function ScreenSystem() {
    this._id = 'Screen system';
};
ScreenSystem.prototype = new System();
ScreenSystem.prototype.update = function(args){
  console.log(this._id, '--> got command: ' , args);
};
/**
 * "Main object and loop"
 */

var InputController = function(systemmanager) {
    this._systemanager = systemmanager;
    this.loop = function() {
        var self = this;
        var stdin = process.stdin;
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding('utf8');

        stdin.on('data', function(key){
            if (key == '\u0003' || key == '\u001B') { // ctrl-c or ESC.
                console.log('...exiting.');
                process.exit();
            }
            else if (key == '\u001B\u005B\u0041') {
                self.notifyObservers('up');
            }
            else if (key == '\u001B\u005B\u0043') {
                self.notifyObservers('right');
            }
            else if (key == '\u001B\u005B\u0042') {
                self.notifyObservers('down');
            }
            else if (key == '\u001B\u005B\u0044') {
                self.notifyObservers('left');
            }
            else {
                for (var i=0; i < key.length; i++) {
                    var keyValue = key.charCodeAt(i).toString(16).toUpperCase();
                    self.notifyObservers(keyValue);
                }
            }
        });
    }
};

//var movementSys = new MovementSystem();
var movementSystem = new MovementSystem();
var screenSystem = new ScreenSystem();
var sm = new SystemManager([screenSystem, movementSystem]);

InputController.prototype = new Observable();
var ic = new InputController(sm);
ic.registerObserver(sm);
ic.loop();
