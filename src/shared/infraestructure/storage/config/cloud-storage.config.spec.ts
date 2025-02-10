import { Storage } from '@google-cloud/storage';
import { cloudStorage } from './cloud-storage.config';

jest.mock('@google-cloud/storage', () => {
  return {
    Storage: jest.fn(() => ({
      bucket: jest.fn((bucketName) => ({
        name: bucketName,
      })),
    })),
  };
});

describe('cloudStorage', () => {
  const mockBucketName = 'mock-bucket-name';
  const mockProjectId = 'mock-project-id';
  const mockCredentials = {
    client_email: 'test@example.com',
    private_key: 'mock-private-key',
  };

  beforeEach(() => {
    process.env.GCLOUD_STORAGE_BUCKET = mockBucketName;
    process.env.GCLOUD_PROJECT_ID = mockProjectId;
    process.env.GOOGLE_APPLICATION_CREDENTIALS =
      JSON.stringify(mockCredentials);
    process.env.NODE_ENV = 'test';
  });

  afterEach(() => {
    delete process.env.GCLOUD_STORAGE_BUCKET;
    delete process.env.GCLOUD_PROJECT_ID;
    delete process.env.GOOGLE_APPLICATION_CREDENTIALS;
    delete process.env.NODE_ENV;
  });

  it('should initialize storage with keyFile in test environment', () => {
    expect(Storage).toHaveBeenCalledWith({
      projectId: mockProjectId,
      keyFile: mockCredentials,
    });
    expect(cloudStorage.bucket.name).toBe(mockBucketName);
  });

  it('should initialize storage with credentials in production environment', () => {
    process.env.NODE_ENV = 'production';

    const { storage, bucket } = cloudStorage;

    expect(Storage).toHaveBeenCalledWith({
      projectId: mockProjectId,
      credentials: mockCredentials,
    });
    expect(bucket.name).toBe(mockBucketName);
  });

  it('should throw an error if GCLOUD_STORAGE_BUCKET is not set', () => {
    delete process.env.GCLOUD_STORAGE_BUCKET;

    expect(() => cloudStorage.bucket).toThrow();
  });
});
