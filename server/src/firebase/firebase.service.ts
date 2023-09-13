import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';

@Injectable()
export class FirebaseService {
  constructor() {
    const connectFireBase = async () => {
      const serviceAccount = (await import('../serviceAccountKey.json')) || {};
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'cloud-app-b7625.appspot.com',
      });
    };

    connectFireBase();
  }

  // Hàm lấy ảnh từ Firebase Storage
  async getImageFromFirebaseStorage(filename: string) {
    const bucket = admin.storage().bucket();

    const file = bucket.file(`product_images/${filename}`); // Thay thế đường dẫn tới tệp ảnh

    // Tải ảnh về dưới dạng URL
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });

    return url;
  }

  async uploadImage(filePath: string, destination: string): Promise<string> {
    try {
      const bucket = admin.storage().bucket();
      const file = bucket.file('product_images/' + destination);

      // Đọc dữ liệu từ tệp cần upload
      const fileStream = fs.createReadStream(filePath);

      // Tạo stream để upload lên Firebase Storage
      const uploadStream = file.createWriteStream({
        metadata: {
          contentType: 'image/jpeg', // Điều chỉnh kiểu dữ liệu tương ứng
        },
      });

      await new Promise<void>((resolve, reject) => {
        uploadStream
          .on('finish', () => {
            resolve();
          })
          .on('error', (err: any) => {
            reject(err);
          });

        // Pipe dữ liệu từ tệp đến stream upload
        fileStream.pipe(uploadStream);
      });

      return await this.getImageFromFirebaseStorage(destination);
    } catch (error) {
      throw new Error('Lỗi khi upload file: ' + error);
    }
  }

  // async uploadImage(file: Express.Multer.File): Promise<string> {
  //   try {
  //     const bucket = admin.storage().bucket();
  //     const folderName = 'product_images';
  //     const storageFileName = `${folderName}/${Date.now()}_${
  //       file.originalname
  //     }`;
  //     const fileStream = bucket.file(storageFileName).createWriteStream({
  //       metadata: {
  //         contentType: file.mimetype,
  //       },
  //     });

  //     fileStream.on('error', (error) => {
  //       console.error('Error uploading file to Firebase Storage:');
  //       throw error;
  //     });

  //     fileStream.on('finish', () => {
  //       console.log('File uploaded to Firebase Storage successfully.');
  //     });

  //     fileStream.end(file.buffer);

  //     // Trả về URL của tệp vừa tải lên
  //     return `https://storage.googleapis.com/${bucket.name}/${storageFileName}`;
  //   } catch (error) {
  //     throw new Error('Lỗi khi upload file');
  //   }
  // }
}
