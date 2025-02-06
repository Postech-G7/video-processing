import { UpdateVideoUseCase } from 'src/video/application/usecases/update-video';
export declare class UpdateVideoDto implements Omit<UpdateVideoUseCase.Input, 'id'> {
    status: 'processing' | 'completed' | 'failed' | 'retrieved';
    id: string;
}
