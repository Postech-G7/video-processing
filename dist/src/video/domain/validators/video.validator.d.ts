import { ClassValidatorFields } from 'src/shared/domain/validators/class-validator-fields';
import { VideoProps } from '../entities/video.entity';
export declare class VideoRules {
    base64: string;
    title: string;
    status: string;
    userId: string;
    userEmail: string;
    createdAt: Date;
    constructor(data: VideoProps);
}
export declare class VideoValidator extends ClassValidatorFields<VideoProps> {
    validate(data: VideoProps): boolean;
}
export declare class VideoValidatorFactory {
    static create(): VideoValidator;
}
