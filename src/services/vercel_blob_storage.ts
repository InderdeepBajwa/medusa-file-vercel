import * as fs from "fs";
import {
  AbstractFileService,
  FileServiceGetUploadStreamResult,
  FileServiceUploadResult,
  GetUploadedFileType,
  UploadStreamDescriptorType,
} from "@medusajs/medusa";
import { put, list, del } from "@vercel/blob";
import { parse } from "path";

class VercelBlobStorageService extends AbstractFileService {
  private vercel_token_: string;

  constructor({}, options) {
    super({}, options);

    this.vercel_token_ = options.vercel_token;
  }

  upload(fileData: Express.Multer.File): Promise<FileServiceUploadResult> {
    return this.uploadFile(fileData);
  }

  uploadProtected(file) {
    return this.uploadFile(file, { isProtected: true, access: "private" });
  }

  uploadFile(file, options = { isProtected: undefined, access: undefined }) {
    const parsedFilename = parse(file.originalname);
    const fileKey = `${parsedFilename.name}-${Date.now()}${parsedFilename.ext}`;

    const params = {
      access: options.access ?? (options.isProtected ? "private" : "public"),
      token: this.vercel_token_,
    };

    return new Promise((resolve, reject) => {
      put(fileKey, fs.createReadStream(file.path), params)
        .then((putBlobResult) => {
          resolve({ url: putBlobResult.url });
        })
        .catch((err) => {
          reject(err);
          return;
        });
    });
  }

  async delete(file) {
    return new Promise((resolve, reject) => {
      del(file, { token: this.vercel_token_ })
        .then((headBlobResult) => {
          resolve({ url: headBlobResult.url });
        })
        .catch((err) => {
          reject(err);
          return;
        });
    });
  }

  async getUploadStreamDescriptor(
    fileData: UploadStreamDescriptorType
  ): Promise<FileServiceGetUploadStreamResult> {}

  async getDownloadStream(
    fileData: GetUploadedFileType
  ): Promise<NodeJS.ReadableStream> {}

  async getPresignedDownloadUrl(
    fileData: GetUploadedFileType
  ): Promise<string> {}
}

export default VercelBlobStorageService;
