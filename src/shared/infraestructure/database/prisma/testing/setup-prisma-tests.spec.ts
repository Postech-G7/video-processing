import { execSync } from 'node:child_process';
import { setupPrismaTests } from './setup-prisma-tests';

jest.mock('node:child_process', () => ({
  execSync: jest.fn(),
}));

describe('setupPrismaTests', () => {
  it('should call execSync with the correct command', () => {
    const expectedCommand =
      'npx dotenv-cli -e .env.test -- npx prisma migrate deploy --schema ./src/shared/infraestructure/database/prisma/schema.prisma';

    setupPrismaTests();

    expect(execSync).toHaveBeenCalledWith(expectedCommand);
  });

  it('should handle errors thrown by execSync', () => {
    const mockError = new Error('Failed to execute command');
    (execSync as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    console.error = jest.fn(); // Mock console.error to avoid polluting test output

    setupPrismaTests();

    expect(console.error).toHaveBeenCalledWith(
      'Error setting up Prisma tests:',
      mockError,
    );
  });
});
