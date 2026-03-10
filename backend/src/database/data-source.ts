import { DataSource } from 'typeorm';
import * as path from 'path';

const isCompiled = path.extname(__filename) === '.js';
const entitiesPattern = isCompiled
  ? path.join(__dirname, '..', 'modules', '**', '*.entity.js')
  : path.join(__dirname, '..', 'modules', '**', '*.entity.ts');
const migrationsPattern = isCompiled
  ? path.join(__dirname, 'migrations', '*.js')
  : path.join(__dirname, 'migrations', '*.ts');

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [entitiesPattern],
  migrations: [migrationsPattern],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
});
