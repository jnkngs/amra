/**
 * Created by kangaja on 27.4.2016.
 */
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
