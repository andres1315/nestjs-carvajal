import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  port: Number(configService.get('DB_PORT')),
  host: configService.get('DB_HOST'),
  synchronize: false,
  logging: true,
  entities: ['src/**/entities/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
};
export default new DataSource(dataSourceOptions);
