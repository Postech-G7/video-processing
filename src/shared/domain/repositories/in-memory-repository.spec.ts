import { Entity } from '../entities/entity';
import { NotFoundError } from '../errors/not-found-error';
import { InMemoryRepository } from './in-memory-repository';

class MockEntity extends Entity {
  constructor(
    public _id: string,
    public name: string,
  ) {
    super();
  }
}

describe('InMemoryRepository', () => {
  let repository: InMemoryRepository<MockEntity>;

  beforeEach(() => {
    repository = new (class extends InMemoryRepository<MockEntity> { })();
  });

  describe('insert', () => {
    it('should insert an entity into the repository', async () => {
      const entity = new MockEntity('1', 'Test Entity');
      await repository.insert(entity);

      expect(repository.items.length).toBe(1);
      expect(repository.items[0]).toBe(entity);
    });
  });

  describe('findById', () => {
    it('should find an entity by its ID', async () => {
      const entity = new MockEntity('1', 'Test Entity');
      repository.items.push(entity);

      const result = await repository.findById('1');

      expect(result).toEqual(entity);
    });

    it('should throw NotFoundError if the entity does not exist', async () => {
      await expect(repository.findById('nonexistent-id')).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe('findAll', () => {
    it('should return all entities in the repository', async () => {
      const entity1 = new MockEntity('1', 'Entity 1');
      const entity2 = new MockEntity('2', 'Entity 2');
      repository.items.push(entity1, entity2);

      const result = await repository.findAll();

      expect(result).toEqual([entity1, entity2]);
    });

    it('should return an empty array if there are no entities', async () => {
      const result = await repository.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update an existing entity', async () => {
      const entity = new MockEntity('1', 'Test Entity');
      repository.items.push(entity);

      const updatedEntity = new MockEntity('1', 'Updated Entity');
      await repository.update(updatedEntity);

      expect(repository.items[0]).toEqual(updatedEntity);
    });

    it('should throw NotFoundError if the entity to update does not exist', async () => {
      const updatedEntity = new MockEntity('nonexistent-id', 'Updated Entity');

      await expect(repository.update(updatedEntity)).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe('delete', () => {
    it('should delete an existing entity', async () => {
      const entity = new MockEntity('1', 'Test Entity');
      repository.items.push(entity);

      await repository.delete('1');

      expect(repository.items.length).toBe(0);
    });

    it('should throw NotFoundError if the entity to delete does not exist', async () => {
      await expect(repository.delete('nonexistent-id')).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe('_get', () => {
    it('should return the entity with the given ID', async () => {
      const entity = new MockEntity('1', 'Test Entity');
      repository.items.push(entity);

      const result = await repository['_get']('1');

      expect(result).toEqual(entity);
    });

    it('should throw NotFoundError if the entity does not exist', async () => {
      await expect(repository['_get']('nonexistent-id')).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe('_getIndex', () => {
    it('should return the index of the entity with the given ID', async () => {
      const entity = new MockEntity('1', 'Test Entity');
      repository.items.push(entity);

      const index = repository['_getIndex']('1');

      expect(index).toBe(0);
    });

    it('should throw NotFoundError if the entity does not exist', async () => {
      await expect(() => repository['_getIndex']('nonexistent-id')).toThrow(
        NotFoundError,
      );
    });
  });
});
