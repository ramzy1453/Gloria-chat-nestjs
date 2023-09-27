import { Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import fs = require('fs/promises');
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  constructor() {}

  async uploadImage(
    file: Express.Multer.File | Buffer,
    subFolder: string,
    folder: string = 'gloria-chat-app',
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: `${folder}/${subFolder}` },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      if (file instanceof Buffer) {
        toStream(file).pipe(upload);
      } else {
        toStream(file.buffer).pipe(upload);
      }
    });
  }

  async deleteImage(publicId: string): Promise<any> {
    {
      try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
      } catch (error) {
        throw error;
      }
    }
  }

  async updateImage(
    file: Express.Multer.File | Buffer,
    publicId: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { public_id: publicId },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
    });
  }
}
