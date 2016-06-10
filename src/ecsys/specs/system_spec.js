/**
 * Created by kangaja on 18.5.2016.
 */

describe('SystemManager', function(){
    var testSystems = [];

    beforeAll(function() {
        testSys1 = new System();

        testSys2 = new System();
        testSys3 = new System();

        testSystems.push(testSys1);
        testSystems.push(testSys2);
        testSystems.push(testSys3);
    });

    it('should accept same system only once', function(){
        var world = {};
        var systemManager = new SystemManager(world);
        systemManager.addSystem(testSystems[0],0);
        expect(systemManager.systems.length).toBe(1);
        systemManager.addSystem(testSystems[1],1);
        expect(systemManager.systems.length).toBe(2);
        expect(function(){systemManager.addSystem(testSystems[0])}).toThrowError(DuplicateSystemError, "System is already added to the system manager");
        ;


    });
    it('should have systems in priority order', function(){
        var world = {};
        var systemManager = new SystemManager(world);
        // mixed priority order to see that sorting really works.
        systemManager.addSystem(testSystems[0],0);
        systemManager.addSystem(testSystems[1],2);
        systemManager.addSystem(testSystems[2],1);

        expect(systemManager.systems).toEqual([testSystems[0],testSystems[2],testSystems[1]]);

    });
    it('should remove system from itself', function(){
        var world = {};
        var systemManager = new SystemManager(world);
        systemManager.addSystem(testSystems[0],0);
        systemManager.addSystem(testSystems[1],2);
        systemManager.addSystem(testSystems[2],1);

        systemManager.removeSystem(testSystems[1]);
        expect(systemManager.systems).toEqual([testSystems[0],testSystems[2]]);

    });
    it('should update all systems it has', function(){
        var world = {};
        var systemManager = new SystemManager(world);
        var entityManager = new EntityManager();

        var creature1 = entityManager.createEntity();
        var creature2 = entityManager.createEntity();

        entityManager.addComponent(creature1.id, {'name':'hitpoints', 'data': {'value':5}});
        entityManager.addComponent(creature2.id, {'name':'hitpoints', 'data': {'value':10}});
        // battlesystem, priority 1
        // moralesystem, priority 2



    });
});
