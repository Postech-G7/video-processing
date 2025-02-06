"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadVideoUseCase = void 0;
const video_output_1 = require("../dtos/video-output");
const bad_request_error_1 = require("../../../shared/application/errors/bad-request-error");
const video_entity_1 = require("../../domain/entities/video.entity");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
var UploadVideoUseCase;
(function (UploadVideoUseCase) {
    class UseCase {
        constructor(videoRepository, authService) {
            this.videoRepository = videoRepository;
            this.authService = authService;
        }
        async execute(input) {
            const { file, jwtToken } = input;
            if (!file || !file.buffer) {
                throw new bad_request_error_1.BadRequestError('File is missing or invalid');
            }
            const decodedToken = await this.authService.verifyJwt(jwtToken);
            const uploadDir = path.join(process.cwd(), 'uploads');
            await fs.mkdir(uploadDir, { recursive: true });
            const fileName = `${Date.now()}-${file.originalname}`;
            const filePath = path.join(uploadDir, fileName);
            await fs.writeFile(filePath, file.buffer);
            const videoEntity = new video_entity_1.VideoEntity({
                title: file.originalname,
                userEmail: decodedToken.email,
                path: filePath,
                status: 'processing',
                createdAt: new Date(),
            });
            await this.videoRepository.insert(videoEntity);
            return this.toOutput(videoEntity);
        }
        toOutput(entity) {
            return video_output_1.VideoOutputMapper.toOutput(entity);
        }
    }
    UploadVideoUseCase.UseCase = UseCase;
})(UploadVideoUseCase || (exports.UploadVideoUseCase = UploadVideoUseCase = {}));
//# sourceMappingURL=upload-video.usecase.js.map