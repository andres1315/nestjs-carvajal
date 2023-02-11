import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { Contact } from '../contacts/entities/contact.entity';

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
  entities: [Contact],
  migrations:
    process.env.NODE_ENV === 'prod'
      ? [__dirname + 'dist/database/migrations/*{.ts,.js}']
      : [__dirname + 'src/database/migrations/*{.ts,.js}'],
};

const datasource = new DataSource(dataSourceOptions);
datasource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default datasource;
