// prisma.config.ts
import 'dotenv/config';
import { defineConfig } from 'prisma/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pooled = process.env.DATABASE_URL;
const unpooled = process.env.DATABASE_URL_UNPOOLED ?? pooled;

if (!unpooled) throw new Error('Missing DATABASE_URL (or DATABASE_URL_UNPOOLED) in environment');

export default defineConfig({
  schema: 'prisma/schema.prisma',

  // ✅ Prisma Migrate should use UNPOOLED for Neon
  datasource: {
    url: unpooled,
  },

  // ✅ Prisma Client adapter (you can choose pooled for runtime)
  client: {
    adapter: new PrismaPg(
      new Pool({
        connectionString: pooled, // runtime: pooled is usually fine
      })
    ),
  },
});
