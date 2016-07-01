// observer pattern testing

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

function Test1() {
    this._counter = 0;
};
Test1.prototype = new Observer();
Test1.prototype.notify = function(args){
    if (args) {
        console.log('I got some more..', args);
        this._counter = this._counter + args;
    }
    else {
        this._counter++;
    }
    console.log('Test1 got incremented', this._counter);
};

function Test2() {
    this._counter = 10;
};
Test2.prototype = new Observer();
Test2.prototype.notify = function(){
    this._counter--;
    console.log('Test2 got decremented', this._counter);
};

var t0 = new Observer();
var t1 = new Test1();
var t2 = new Test2();

var obs = new Observable();
obs.registerObserver(t0);
obs.registerObserver(t1);
obs.registerObserver(t2);

obs.notifyObservers(5);
obs.notifyObservers();
obs.notifyObservers(-1);
