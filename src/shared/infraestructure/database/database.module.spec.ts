import { Test } from '@nestjs/testing';
import { DatabaseModule } from './database.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

describe('DatabaseModule', () => {
  describe('Global Module Configuration', () => {
    it('should compile the module and provide all dependencies', async () => {
      const module = await Test.createTestingModule({
        imports: [DatabaseModule],
      }).compile();

      expect(module).toBeDefined();

      // Verifica se todos os provedores estão disponíveis no contexto
      const prismaService = module.get<PrismaService>(PrismaService);

      expect(prismaService).toBeInstanceOf(PrismaService);
    });
  });

  describe('forTest Method', () => {
    it('should return a DynamicModule with the provided PrismaClient', () => {
      const mockPrismaClient = {} as PrismaClient;

      const dynamicModule = DatabaseModule.forTest(mockPrismaClient);

      expect(dynamicModule.module).toBe(DatabaseModule);
      expect(dynamicModule.providers).toHaveLength(1);

      //const provider = dynamicModule.providers[0];
      //expect(provider.provide).toBe(PrismaService);
      //expect(provider.useFactory()).toBe(mockPrismaClient);
    });
  });
});
