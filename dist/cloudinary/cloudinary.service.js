"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const toStream = require("buffer-to-stream");
let CloudinaryService = exports.CloudinaryService = class CloudinaryService {
    constructor() { }
    async uploadImage(file, subFolder, folder = 'gloria-chat-app') {
        return new Promise((resolve, reject) => {
            const upload = cloudinary_1.v2.uploader.upload_stream({ folder: `${folder}/${subFolder}` }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            if (file instanceof Buffer) {
                toStream(file).pipe(upload);
            }
            else {
                toStream(file.buffer).pipe(upload);
            }
        });
    }
    async deleteImage(publicId) {
        {
            try {
                const result = await cloudinary_1.v2.uploader.destroy(publicId);
                return result;
            }
            catch (error) {
                throw error;
            }
        }
    }
    async updateImage(file, publicId) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload_stream({ public_id: publicId }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
        });
    }
};
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map