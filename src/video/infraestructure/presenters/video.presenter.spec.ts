import { VideoCollectionPresenter, VideoPresenter } from './video.presenter';
import { ListVideosUseCase } from '../../application/usecases/list-videos.usecase';

describe('VideoPresenter', () => {
  it('should map VideoOutput to VideoPresenter correctly', () => {
    const mockVideoOutput = {
      id: 'video123',
      title: 'Test Video',
      status: 'completed' as const,
      base64: 'base64-encoded-string',
      userId: 'user456',
      userEmail: 'test@example.com',
      createdAt: new Date('2023-10-01T12:00:00Z'),
    };

    const presenter = new VideoPresenter(mockVideoOutput);

    expect(presenter.id).toBe('video123');
    expect(presenter.title).toBe('Test Video');
    expect(presenter.status).toBe('completed');
    expect(presenter.base64).toBe('base64-encoded-string');
    expect(presenter.userId).toBe('user456');
    expect(presenter.userEmail).toBe('test@example.com');
    expect(presenter.createdAt).toBe('2023-10-01T12:00:00.000Z'); // Verifica a transformação da data
  });
});

describe('VideoCollectionPresenter', () => {
  it('should map ListVideosUseCase.Output to VideoCollectionPresenter correctly', () => {
    const mockListVideosOutput: ListVideosUseCase.Output = {
      items: [
        {
          id: 'video123',
          title: 'Test Video 1',
          status: 'completed',
          base64: 'base64-encoded-string-1',
          userId: 'user456',
          userEmail: 'test@example.com',
          createdAt: new Date('2023-10-01T12:00:00Z'),
        },
        {
          id: 'video456',
          title: 'Test Video 2',
          status: 'processing',
          base64: 'base64-encoded-string-2',
          userId: 'user789',
          userEmail: 'another@example.com',
          createdAt: new Date('2023-10-02T12:00:00Z'),
        },
      ],
      total: 2,
      currentPage: 1,
      perPage: 10,
      lastPage: 1,
    };

    const collectionPresenter = new VideoCollectionPresenter(
      mockListVideosOutput,
    );

    // Verifica a paginação
    expect(collectionPresenter.total).toBe(2);
    expect(collectionPresenter.currentPage).toBe(1);
    expect(collectionPresenter.perPage).toBe(10);
    expect(collectionPresenter.lastPage).toBe(1);

    // Verifica os itens
    expect(collectionPresenter.data.length).toBe(2);
    expect(collectionPresenter.data[0]).toBeInstanceOf(VideoPresenter);
    expect(collectionPresenter.data[0].id).toBe('video123');
    expect(collectionPresenter.data[0].title).toBe('Test Video 1');
    expect(collectionPresenter.data[0].status).toBe('completed');
    expect(collectionPresenter.data[0].createdAt).toBe(
      '2023-10-01T12:00:00.000Z',
    );

    expect(collectionPresenter.data[1]).toBeInstanceOf(VideoPresenter);
    expect(collectionPresenter.data[1].id).toBe('video456');
    expect(collectionPresenter.data[1].title).toBe('Test Video 2');
    expect(collectionPresenter.data[1].status).toBe('processing');
    expect(collectionPresenter.data[1].createdAt).toBe(
      '2023-10-02T12:00:00.000Z',
    );
  });
});
