/*! ecsys - v0.1 - 2016-09-19*/
function Entity() {
    var _getRandomId = function(){
        return Math.floor(Math.random() * (1000000 -1)) +1;
    };
    this.id = _getRandomId();
    this.components = [];
    this.addComponent = function(component) {
        if(component.hasOwnProperty('name') && component.hasOwnProperty('data')) {
            this.components[component.name] = component.data;
        }
        else {
            throw new TypeError("Component needs a name and data attributes");
        }
    };
    this.removeComponent = function(componentName) {
        if(this.components[componentName]) {
            delete this.components[componentName];
            return true;
        }
        else {
            return false;
        }
    };
};

function EntityManager() {
    this._database = {};

    this.getDatabase = function() {
        return this._database;
    };
    this.getEntityCount = function() {
        if(Object.keys(this._database).length === 0) {
            return 0;
        }
        var entities = {};
        for(var componentName in this._database) {
            for(var entity_id in this._database[componentName]) {
                entities[entity_id]++;
            }
        }
        return Object.keys(entities).length;
    };
    this.createEntity = function() {
        var entity = new Entity();
        return entity;
    };
    this.addComponent = function(entity_id, component) {
        var mainKey = '';
        if(component.hasOwnProperty('name') && component.hasOwnProperty('data')) {
            mainKey = component.name;
        }
        else {
            throw new TypeError("Component needs a name attribute");
        }
        if (!this._database[mainKey]) {

            this._database[mainKey] = {};
        }
        this._database[mainKey][entity_id] = component.data;

    };
    this.removeComponent = function(entity, componentName) {
        if(this._database.hasOwnProperty(componentName)) {
            delete this._database[componentName];
        }
        else {
            throw new TypeError("Component doesn't exist in database");
        }
    };
    this.EntitiesByType = function(componentType){
        if(this._database.hasOwnProperty(componentType)) {
            return this._database[componentType];
        }
        else {
            return null;
        }
    };
    this.componentForEntity = function(entity, componentType) {
        if(this._database.hasOwnProperty(componentType)) {
            if(this._database[componentType].hasOwnProperty('entity.id')) {
                return this._database[componentType][entity.id];
            }
        }
        return null;
    };
    this.removeEntity = function(entity_id) {
        if(Object.keys(this._database).length === 0) {
            return 0;
        }
        for(var componentType in this._database) {
            if(this._database[componentType].hasOwnProperty(entity_id)) {
                delete this._database[componentType][entity_id];
            }
            if(Object.keys(this._database[componentType]).length === 0) {
                delete this._database[componentType];
            }
        }
    };
};

function DuplicateSystemError(message) {
    this.message = message;
    this.name = 'DuplicateSystemException';
};
DuplicateSystemError.prototype = Error.prototype;

function System() {
    this.systemManager = {};
    this.priority = 0;
    this.update = function(deltaTime, entityManager) {
        console.log('System.update called with dt=%s, entity_manager=%s', deltaTime, entityManager);
    };
};

function SystemManager(parent) {
    this.parent = parent;
    this.systems = [];
    this.addSystem = function(system, priority) {
        this.systems.forEach(function(sys){
            if(Object.is(system, sys)) {
                throw new DuplicateSystemError("System is already added to the system manager");
            }
        });
        system.priority = priority;
        system.systemManager = this;
        this.systems.push(system);
        this.systems.sort(function(a,b){if(a.priority > b.priority) return 1;});

    };
    this.removeSystem = function(systemToRemove) {
        this.systems = this.systems.filter(function(sys){
            return !Object.is(systemToRemove, sys);
        });
    };
    this.updateSystems = function(deltaTime) {

    };
};

SystemManager.prototype = new Observer();
SystemManager.prototype.notify = function(args){
    console.log('* SystemManager starting system updates...');
    this.updateSystems(args);
};


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
