import { PrismaService } from '../../../../../shared/infraestructure/database/prisma/prisma.service';
import { VideoEntity } from '../../../../domain/entities/video.entity';
import { VideoRepository } from '../../../../domain/repositories/video.repository';
export declare class VideoPrismaRepository implements VideoRepository.Repository {
    private prismaService;
    sortableFields: string[];
    constructor(prismaService: PrismaService);
    search(props: VideoRepository.SearchParams): Promise<VideoRepository.SearchResult>;
    insert(entity: VideoEntity): Promise<void>;
    update(entity: VideoEntity): Promise<void>;
    findById(id: string): Promise<VideoEntity>;
    findAll(): Promise<VideoEntity[]>;
    delete(id: string): Promise<void>;
    protected _get(id: string): Promise<VideoEntity>;
}
