import { DynamicModule } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class DatabaseModule {
    static forTest(prismaClient: PrismaClient): DynamicModule;
}
