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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessVideoUseCase = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const archiver_1 = __importDefault(require("archiver"));
const bad_request_error_1 = require("../../../shared/application/errors/bad-request-error");
var ProcessVideoUseCase;
(function (ProcessVideoUseCase) {
    class UseCase {
        constructor(videoRepository) {
            this.videoRepository = videoRepository;
        }
        createTempDir(id) {
            const tempDir = path.join(process.cwd(), 'temp', id);
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }
            return tempDir;
        }
        async processVideo(videoPath, outputDir) {
            return new Promise((resolve, reject) => {
                const screenshots = [];
                (0, fluent_ffmpeg_1.default)(videoPath)
                    .on('end', () => resolve(screenshots))
                    .on('error', (err) => reject(err))
                    .on('progress', (progress) => {
                    const screenshotPath = path.join(outputDir, `screenshot-${progress.frames}.png`);
                    screenshots.push(screenshotPath);
                })
                    .screenshots({
                    count: 30,
                    folder: outputDir,
                    filename: 'screenshot-%i.png',
                });
            });
        }
        async createZipFile(screenshots, outputDir) {
            const zipPath = path.join(outputDir, 'screenshots.zip');
            const output = fs.createWriteStream(zipPath);
            const archive = (0, archiver_1.default)('zip', { zlib: { level: 9 } });
            return new Promise((resolve, reject) => {
                output.on('close', () => resolve(zipPath));
                archive.on('error', (err) => reject(err));
                archive.pipe(output);
                screenshots.forEach((screenshot) => {
                    archive.file(screenshot, { name: path.basename(screenshot) });
                });
                archive.finalize();
            });
        }
        cleanup(tempDir) {
            if (fs.existsSync(tempDir)) {
                fs.rmSync(tempDir, { recursive: true, force: true });
            }
        }
        async execute(input) {
            const { id } = input;
            const video = await this.videoRepository.findById(id);
            if (!video) {
                throw new bad_request_error_1.BadRequestError('Video not found');
            }
            const tempDir = this.createTempDir(id);
            const videoPath = path.join(tempDir, 'video.mp4');
            try {
                const videoBuffer = await fs.promises.readFile(video.path);
                fs.writeFileSync(videoPath, videoBuffer);
                const screenshots = await this.processVideo(videoPath, tempDir);
                const zipPath = await this.createZipFile(screenshots, tempDir);
                video.updateStatus('completed');
                await this.videoRepository.update(video);
                this.cleanup(tempDir);
            }
            catch (error) {
                this.cleanup(tempDir);
                video.updateStatus('failed');
                await this.videoRepository.update(video);
                throw error;
            }
        }
    }
    ProcessVideoUseCase.UseCase = UseCase;
})(ProcessVideoUseCase || (exports.ProcessVideoUseCase = ProcessVideoUseCase = {}));
//# sourceMappingURL=process-video.usecase.js.map