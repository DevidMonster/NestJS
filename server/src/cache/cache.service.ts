import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CronJob } from 'cron';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Product) private product: Repository<Product>,
  ) {
    this.syncDataToRedis();
  }

  // Đặt lịch đồng bộ hóa dữ liệu vào Redis hàng ngày lúc 2:00 AM
  private readonly job = new CronJob('0 2 * * *', async () => {
    try {
      console.log('Đồng bộ hóa dữ liệu vào Redis...');
      await this.syncDataToRedis();
      console.log('Đồng bộ hóa dữ liệu thành công.');
    } catch (error) {
      console.error('Đồng bộ hóa dữ liệu thất bại:', error);
    }
  });

  start() {
    this.job.start();
  }

  async get(key: string): Promise<any> {
    const product = await this.cacheManager.get(key);
    return product ? JSON.parse(product as string) : null;
  }

  async set(key: string, value: any, ttl: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async syncDataToRedis() {
    const products = await this.product.find();

    for (const product of products) {
      // Cache mỗi sản phẩm vào Redis với một key và TTL cụ thể
      await this.cacheManager.set(
        `inventory:${product.id}`,
        JSON.stringify(product),
        86400,
      ); // TTL là 1 giờ
    }
  }
}
