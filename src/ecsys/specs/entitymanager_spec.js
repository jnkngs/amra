/**
 * Created by kangaja on 21.4.2016.
 * https://github.com/wkevina/entity-db
 * */
describe('EntityManager', function() {
    it('should create new entity with unique identifier', function() {
        var entityManager = new EntityManager();
        var entity = entityManager.createEntity();
        expect(entity.id).not.toBeNull();

        var entity2 = entityManager.createEntity();
        expect(entity.id).not.toBe(entity2.id);
    });
    it('should have a database with length of zero', function() {
        var entityManager = new EntityManager();
        var entityCount = entityManager.getEntityCount();

        expect(entityCount).toBe(0);
    });
    it('should add new component to entity and database length should increase', function() {
        var entityManager = new EntityManager();
        var entity = entityManager.createEntity();
        var entity2 = entityManager.createEntity();
        entityManager.addComponent(entity.id, {'name':'foo', 'data': {'a':1, 'b':2}});
        entityManager.addComponent(entity2.id, {'name':'foo', 'data': {'a':3, 'b':4}});
        entityManager.addComponent(entity.id, {'name':'foo2', 'data': {'desc':'some text'}});
        entityManager.getEntityCount();
        expect(entityManager.getEntityCount()).toBe(2);

    });
    it('should remove component foo from entity', function() {
        var entityManager = new EntityManager();
        var entity = entityManager.createEntity();

        entityManager.addComponent(entity.id, {'name':'foo', 'data': {'a':1, 'b':2}});
        entityManager.removeComponent(entity, 'foo');

        expect(entityManager.getEntityCount()).toBe(0);
    });
    it('should get all the entities with certain component name', function() {
        var entityManager = new EntityManager();
        var entity = entityManager.createEntity();
        var entity2 = entityManager.createEntity();
        entityManager.addComponent(entity.id, {'name':'foo', 'data': {'a':1, 'b':2}});
        entityManager.addComponent(entity2.id, {'name':'foo', 'data': {'a':3, 'b':4}});

        var entities = entityManager.EntitiesByType('foo');
        expect(Object.keys(entities).length).toBe(2);
    });
    it('should remove given entity from itself', function() {
        var entityManager = new EntityManager();
        var entity = entityManager.createEntity();
        entityManager.addComponent(entity.id, {'name':'foo', 'data': {'a':1, 'b':2}});
        entityManager.addComponent(entity.id, {'name':'bar', 'data': {'a':3, 'b':4}});
        entityManager.removeEntity(entity.id);
        var db = entityManager.getDatabase();
        expect(Object.keys(db).length).toBe(0);
    });
});
