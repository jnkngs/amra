/**
 * Created by kangaja on 22.2.2016.
 */

describe('Entity', function() {
    it('has an identifier and those must be unique', function() {
        var entity = new Entity();
        expect(entity.id).not.toBeNull();

        var entity2 = new Entity();
        expect(entity.id).not.toBe(entity2.id);
    });
    it('should be able to have several components object as a member', function() {
        var comp1 = { 'name':'foo', 'data': {'a':1} };
        var comp2 = { 'name':'bar', 'data': {'b':2} };
        var entity = new Entity();
        entity.addComponent(comp1);
        expect(Object.keys(entity.components).length).toBe(1);

        entity.addComponent(comp2);
        expect(Object.keys(entity.components).length).toBe(2);
    });
    it('should not accept component without name', function() {
        var entity = new Entity();
        var comp = {'foo':'bar'};
        expect(function(){entity.addComponent(comp)}).toThrowError(TypeError, "Component needs a name and data attributes");
    });
    it('should be able to remove component from itself', function() {
        var component = {'name':'foo'};
        var entity = new Entity();
        entity.removeComponent('foo');
        expect(Object.keys(entity.components).length).toBe(0);
    });
    it('should raise an exception when unknown component is removed', function() {
        var entity = new Entity();
        var ret = entity.removeComponent('foo');
        expect(ret).toBeFalsy()
    });
});
