/// <reference types="multer" />
/// <reference types="node" />
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    constructor();
    uploadImage(file: Express.Multer.File | Buffer, subFolder: string, folder?: string): Promise<UploadApiResponse | UploadApiErrorResponse>;
    deleteImage(publicId: string): Promise<any>;
    updateImage(file: Express.Multer.File | Buffer, publicId: string): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
