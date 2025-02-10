import { SearchableInMemoryRepository } from './searchable-in-memory-repository';
import { Entity } from '../entities/entity';
import { SearchParams, SearchResult } from './searchable-repository-contract';

class MockEntity extends Entity {
  constructor(
    public _id: string,
    public name: string,
    public age: number,
  ) {
    super();
  }
}

class MockSearchableRepository extends SearchableInMemoryRepository<
  MockEntity,
  string
> {
  sortableFields = ['name'];

  protected async applyFilter(
    items: MockEntity[],
    filter: string | null,
  ): Promise<MockEntity[]> {
    if (!filter) return items;
    return items.filter((item) => item.name.includes(filter));
  }
}

describe('SearchableInMemoryRepository', () => {
  let repository: MockSearchableRepository;

  beforeEach(() => {
    repository = new MockSearchableRepository();
    repository.items = [
      new MockEntity('1', 'Alice', 30),
      new MockEntity('2', 'Bob', 25),
      new MockEntity('3', 'Charlie', 35),
      new MockEntity('4', 'David', 40),
    ];
  });

  describe('search', () => {
    it('should return all items when no params are provided', async () => {
      const params = new SearchParams({});
      const result = await repository.search(params);

      expect(result).toBeInstanceOf(SearchResult);
      expect(result.items).toHaveLength(4);
      expect(result.total).toBe(4);
      expect(result.currentPage).toBe(1);
      expect(result.perPage).toBe(15); // Default value
      expect(result.sort).toBeNull();
      expect(result.sortDir).toBeNull();
      expect(result.filter).toBeNull();
    });

    it('should apply filter correctly', async () => {
      const params = new SearchParams({ filter: 'A' });
      const result = await repository.search(params);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].name).toBe('Alice');
      expect(result.total).toBe(1);
    });

    it('should apply sort correctly', async () => {
      const params = new SearchParams({ sort: 'name', sortDir: 'asc' });
      const result = await repository.search(params);

      expect(result.items.map((item) => item.name)).toEqual([
        'Alice',
        'Bob',
        'Charlie',
        'David',
      ]);
    });

    it('should apply pagination correctly', async () => {
      const params = new SearchParams({ page: 2, perPage: 2 });
      const result = await repository.search(params);

      expect(result.items.map((item) => item.name)).toEqual([
        'Charlie',
        'David',
      ]);
      expect(result.total).toBe(4);
      expect(result.currentPage).toBe(2);
      expect(result.perPage).toBe(2);
    });

    it('should combine filter, sort, and pagination correctly', async () => {
      const params = new SearchParams({
        filter: 'a',
        sort: 'name',
        sortDir: 'desc',
        page: 1,
        perPage: 2,
      });
      const result = await repository.search(params);

      expect(result.items.map((item) => item.name)).toEqual([
        'David',
        'Charlie',
      ]);
      expect(result.total).toBe(3);
      expect(result.currentPage).toBe(1);
      expect(result.perPage).toBe(2);
    });
  });

  describe('applySort', () => {
    it('should sort items by a valid sortable field', async () => {
      const items = await repository.applySort(repository.items, 'name', 'asc');

      expect(items.map((item) => item.name)).toEqual([
        'Alice',
        'Bob',
        'Charlie',
        'David',
      ]);
    });

    it('should not sort items if the field is not sortable', async () => {
      const items = await repository.applySort(repository.items, 'age', 'asc');

      expect(items.map((item) => item.name)).toEqual([
        'Alice',
        'Bob',
        'Charlie',
        'David',
      ]);
    });

    it('should sort items in descending order', async () => {
      const items = await repository.applySort(
        repository.items,
        'name',
        'desc',
      );

      expect(items.map((item) => item.name)).toEqual([
        'David',
        'Charlie',
        'Bob',
        'Alice',
      ]);
    });
  });

  describe('applyPagination', () => {
    it('should paginate items correctly', async () => {
      const items = await repository.applyPagination(repository.items, 2, 2);

      expect(items.map((item) => item.name)).toEqual(['Charlie', 'David']);
    });

    it('should handle out-of-range pages', async () => {
      const items = await repository.applyPagination(repository.items, 3, 2);

      expect(items).toHaveLength(0);
    });
  });
});
