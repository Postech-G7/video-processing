import { ClassValidatorFields } from 'src/shared/domain/validators/class-validator-fields';
import { VideoProps } from '../entities/video.entity';
export declare class VideoRules {
    title: string;
    status: string;
    userEmail: string;
    path?: string;
    createdAt?: Date;
    constructor(data: VideoProps);
}
export declare class VideoValidator extends ClassValidatorFields<VideoProps> {
    validate(data: VideoProps): boolean;
}
export declare class VideoValidatorFactory {
    static create(): VideoValidator;
}
