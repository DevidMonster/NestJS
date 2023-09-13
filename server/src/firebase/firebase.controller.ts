import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as fs from 'fs';

@Controller('firebase')
export class FirebaseController {
  constructor(private firebaseService: FirebaseService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (req, file, callback) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp']; // Thêm các loại tệp bạn muốn cho phép ở đây
        if (allowedMimes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('File type not allowed'), null); // Nếu tệp không hợp lệ, trả về lỗi
        }
      },
    }),
  )
  async uploadImage(
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    const filePath = image.path;
    const destination = `${Date.now()}_${image.originalname}`;
    console.log(destination);

    // Gọi dịch vụ firebaseService để tải lên tệp ảnh lên Firebase Storage
    const imageUrl = await this.firebaseService.uploadImage(
      filePath,
      destination,
    );

    // Xoá tệp tạm thời trên máy chủ sau khi đã tải lên thành công
    fs.unlinkSync(filePath);

    return { imageUrl };

    // try {
    //   console.log(image);
    //   const imageUrl = await this.firebaseService.uploadImage(image);

    //   return { imageUrl };
    // } catch (error) {
    //   console.error('Lỗi khi xử lý tải lên:', error);
    //   throw new Error('Lỗi khi xử lý tải lên');
    // }
  }
}
