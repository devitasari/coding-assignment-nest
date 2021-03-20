import { S3Service } from './s3.service';
import { ConfigService } from '@nestjs/config';

const mS3Instance = {
  upload: jest.fn().mockReturnThis(),
  promise: jest.fn()
};

jest.mock('aws-sdk', () => {
  return { S3: jest.fn(() => mS3Instance) };
});

describe('S3Service', () => {
  it('should upload succesfully', async () => {
    const configService = new ConfigService()
    mS3Instance.promise.mockResolvedValueOnce('just for test');
    const s3ServiceInstance = new S3Service(configService);    
    const actual = await s3ServiceInstance.upload('anyKey', Buffer.from('test'));
    expect(mS3Instance.upload).toBeCalledWith({ Key: 'anyKey', Body: Buffer.from('test') });
    expect(mS3Instance.upload).toHaveReturned()
    expect(actual).toEqual('just for test');
  });
});
