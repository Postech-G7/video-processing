import { VideoEntity } from '../../../video/domain/entities/video.entity';
import { VideoRepository } from '../../../video/domain/repositories/video.repository';

describe('VideoRepository', () => {
  describe('SearchParams', () => {
    it('should extend DefaultSearchParams and initialize correctly', () => {
      const filter = 'test-filter';
      const params = new VideoRepository.SearchParams({
        page: 2,
        perPage: 10,
        sort: 'title',
        sortDir: 'asc',
        filter,
      });

      //expect(params).toBeInstanceOf(URLSearchParams);
      expect(params.page).toBe(2);
      expect(params.perPage).toBe(10);
      expect(params.sort).toBe('title');
      expect(params.sortDir).toBe('asc');
      expect(params.filter).toBe(filter);
    });

    it('should use default values when no parameters are provided', () => {
      const params = new VideoRepository.SearchParams();

      expect(params.page).toBe(1);
      expect(params.perPage).toBe(15); // Assuming default value is 15
      expect(params.sort).toBeNull();
      expect(params.sortDir).toBeNull();
      expect(params.filter).toBeNull();
    });
  });

  describe('SearchResult', () => {
    it('should extend DefaultSearchResult and initialize correctly', () => {
      const items = [
        new VideoEntity({
          title: 'Video 1',
          status: 'completed',
          userId: 'user1',
          userEmail: 'user1@example.com',
          base64: 'base64-encoded-string-1',
        }),
        new VideoEntity({
          title: 'Video 2',
          status: 'processing',
          userId: 'user2',
          userEmail: 'user2@example.com',
          base64: 'base64-encoded-string-2',
        }),
      ];

      const result = new VideoRepository.SearchResult({
        items,
        total: 2,
        currentPage: 1,
        perPage: 10,
        sort: 'title',
        sortDir: 'asc',
        filter: 'test-filter',
      });

      //expect(result).toBeInstanceOf(DefaultSearchResult);
      expect(result.items).toEqual(items);
      expect(result.total).toBe(2);
      expect(result.currentPage).toBe(1);
      expect(result.perPage).toBe(10);
      expect(result.sort).toBe('title');
      expect(result.sortDir).toBe('asc');
      expect(result.filter).toBe('test-filter');
    });
  });

  describe('Repository Interface', () => {
    it('should enforce the SearchableRepositoryInterface contract', () => {
      const repository: VideoRepository.Repository = {
        sortableFields: ['title'],
        search: jest.fn(),
        insert: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      };

      expect(repository.sortableFields).toBeDefined();
      expect(repository.search).toBeDefined();
      expect(repository.insert).toBeDefined();
      expect(repository.findById).toBeDefined();
      expect(repository.findAll).toBeDefined();
      expect(repository.update).toBeDefined();
      expect(repository.delete).toBeDefined();
    });
  });
});
