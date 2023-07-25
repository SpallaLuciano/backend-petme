import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { bucketEnvs, ErrorException } from '../../common';
import { Image, Profile } from '../../entities';
import { v4 as uuidV4 } from 'uuid';
import sharp from 'sharp';

const { region, accessKeyId, secretAccessKey, bucketName, endpoint } =
  bucketEnvs;

@Injectable()
export class FileService {
  private s3Client: S3Client;

  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {
    this.s3Client = new S3Client({
      region,
      credentials: { accessKeyId, secretAccessKey },
      endpoint,
      forcePathStyle: true,
    });
  }

  async createImage(
    description: string,
    file: Express.Multer.File,
  ): Promise<Image> {
    const queryRunner =
      this.imageRepository.manager.connection.createQueryRunner();
    const key = this.getKey(file);

    await queryRunner.startTransaction();

    try {
      const image = this.imageRepository.create({
        url: `${endpoint}/${key}`,
        description,
      });

      await this.imageRepository.save(image);
      await this.uploadFile(file, key);

      await queryRunner.commitTransaction();

      return image;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ErrorException('Hubo un error al crear la imagen');
    }
  }

  async removeImage(id: string, from?: string): Promise<boolean> {
    const image = await this.imageRepository.findOneBy({ id });
    const key = image.url.split('/').pop();

    const queryRunner =
      this.imageRepository.manager.connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      if (from === 'profile') {
        await queryRunner.manager.update(
          Profile,
          { image: { id } },
          { image: null },
        );
      }

      await queryRunner.manager.remove(image);

      await this.removeFile(`images/${key}`);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ErrorException('Hubo un problema al eliminar la imagen');
    }
  }

  private async uploadFile(file: Express.Multer.File, key: string) {
    const { contentType, fileStream } = await this.getFileMetadata(file);

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: fileStream,
      ContentType: contentType,
    });

    const uploadResult = await this.s3Client.send(command);

    return uploadResult;
  }

  private async removeFile(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const deleteResult = await this.s3Client.send(command);

    return deleteResult;
  }

  private async getFileMetadata(file: Express.Multer.File) {
    const contentType = file.mimetype;

    const fileStream = await sharp(file.buffer)
      .resize({ height: 500, width: 500, fit: 'inside' })
      .toBuffer();

    return {
      fileStream,
      contentType,
    };
  }

  private getKey(file: Express.Multer.File) {
    const fileName = file.originalname.split('.');
    const fileEnd = fileName.pop();

    return `images/${uuidV4()}.${fileEnd}`;
  }
}
