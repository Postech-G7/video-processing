import { Test } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
//import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn(() => ({
      $connect: jest.fn(),
      $disconnect: jest.fn(),
    })),
  };
});

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('onModuleInit', () => {
    it('should call $connect when the module initializes', async () => {
      await prismaService.onModuleInit();

      expect(prismaService.$connect).toHaveBeenCalled();
    });
  });

  describe('onModuleDestroy', () => {
    it('should call $disconnect when the module is destroyed', async () => {
      await prismaService.onModuleDestroy();

      expect(prismaService.$disconnect).toHaveBeenCalled();
    });
  });
});
