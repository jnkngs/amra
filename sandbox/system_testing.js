// simple scheduler and timing tests
var System = function(priority) {
    this._priority = priority;
    this.update = function() {};
};

var SystemManager = function(systems) {
    this._systems = systems;
    this.update = function() {
        //TODO: refactor for priority
        for (var i = 0; i<this._systems.length; i++) {
            console.log('Entering systemManager update', i);
            this._systems[i].update();
            console.log('Exiting systemManager update', i);
        }
    };
};

test1 = new System(2);
test2 = new System(0);
test3 = new System(1);

test1.update = function() {
    console.log('Entering test 1');
    setTimeout(function(){console.log("--> Finished with test 1"); }, 3000);
    console.log('Exiting test 1');

};

test2.update = function() {
    console.log('Entering test 2');
    setTimeout(function(){ console.log("--> Finished with test 2"); }, 100);
    console.log('Exiting test 2');
};

test3.update = function() {
    console.log('Entering test 3');
    setTimeout(function(){ console.log("--> Finished with test 3"); }, 10000);
    console.log('Exiting test 3');
};
// main
var ss = new SystemManager([test1,test2,test3]);
ss.update();