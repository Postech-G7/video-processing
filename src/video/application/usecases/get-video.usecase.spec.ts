import { BadRequestError } from '../../../shared/application/errors/bad-request-error';
import { NotFoundError } from '../../../shared/domain/errors/not-found-error';
import { VideoEntity } from '../../domain/entities/video.entity';
import { VideoOutputMapper } from '../dtos/video-output';
import { GetVideoUseCase } from './get-video.usecase';
import { VideoRepository } from '../../domain/repositories/video.repository';

describe('GetVideoUseCase', () => {
	let useCase: GetVideoUseCase.UseCase;
	let videoRepositoryMock: jest.Mocked<VideoRepository.Repository>;

	beforeEach(() => {
		videoRepositoryMock = {
			findById: jest.fn(),
		} as unknown as jest.Mocked<VideoRepository.Repository>;

		useCase = new GetVideoUseCase.UseCase(videoRepositoryMock);
	});

	describe('execute', () => {
		it('should return the video output when a valid ID is provided', async () => {
			const mockVideoId = 'video123';
			const mockVideoEntity = new VideoEntity({
				id: mockVideoId,
				title: 'Test Video',
				createdAt: new Date(),
				status: 'completed',
				userId: 'user456',
				userEmail: 'test@example.com',
				base64: 'base64-encoded-string',
				processedVideoUrl: 'https://example.com/processed-video.mp4',
			});

			const expectedOutput = VideoOutputMapper.toOutput(mockVideoEntity);

			videoRepositoryMock.findById.mockResolvedValue(mockVideoEntity);

			const result = await useCase.execute({ id: mockVideoId });

			expect(videoRepositoryMock.findById).toHaveBeenCalledWith(mockVideoId);
			expect(result).toEqual(expectedOutput);
		});

		it('should throw BadRequestError if input data is not provided', async () => {
			await expect(useCase.execute(null as any)).rejects.toThrow(
				BadRequestError,
			);
			await expect(useCase.execute({ id: null })).rejects.toThrow(
				BadRequestError,
			);
		});

		it('should throw NotFoundError if the video is not found', async () => {
			const mockVideoId = 'nonexistent-video';
			videoRepositoryMock.findById.mockRejectedValue(
				new NotFoundError('Video not found'),
			);

			await expect(useCase.execute({ id: mockVideoId })).rejects.toThrow(
				NotFoundError,
			);
		});
	});
});
