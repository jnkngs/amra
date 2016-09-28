/**
 * Created by kangaja on 19.9.2016.
 */
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
    this.notify = function(params) {
        console.log('default implementation');
    };
};
