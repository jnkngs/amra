/**
 * Created by kangaja on 12.3.2016.
 */

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
