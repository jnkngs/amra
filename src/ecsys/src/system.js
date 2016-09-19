/**
 * Created by kangaja on 18.5.2016.
 */



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

