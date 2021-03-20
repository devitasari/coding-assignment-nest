import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { AWS_ACCESS_KEY_ID, AWS_BUCKET, AWS_REGION, AWS_SECRET_ACCESS_KEY } from '../../config/app.config';

@Injectable()
export class S3Service {
  // TODO: To be implemented.
  // TODO: Unit test is needed in src/aws/s3/s3.service.spec.ts.
  private readonly s3: S3;
  private readonly bucket: string;

  constructor(private readonly configService : ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get(AWS_ACCESS_KEY_ID),
      secretAccessKey: this.configService.get(AWS_SECRET_ACCESS_KEY),
      region: this.configService.get(AWS_REGION),
    });
    this.bucket = this.configService.get(AWS_BUCKET);
  }

  public async upload(key: string, buffer: Buffer): Promise<any> {
    const bucket = this.bucket;
    const params = { Bucket: bucket, Key: key, Body: buffer };
    const upload = await this.s3.upload(params).promise();
    // console.log(upload, '>>>>>');
    return upload;
  }


  public async download(): Promise<any> {
    const bucket = this.bucket;
    const params = { Bucket: bucket, Key: 'anyKey'};
    const download = await this.s3.getObject(params).promise();
    return download;
  }
}
