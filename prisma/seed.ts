import * as dotenv from 'dotenv'
dotenv.config()

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Connecting to database...");
  console.log("DATABASE_URL:", process.env.DATABASE_URL?.slice(0, 40) + "...");

  const profile = await prisma.profile.upsert({
    where: { id: "catherine-yang" },
    update: {},
    create: {
      id: "catherine-yang",
      name: "Catherine Yang",
      title: "Simulation Engine (Solver) Developer · FEA Application Engineer",
      intro: "I design and build high-performance simulation engines.",
      brandName: "CalcSim",
      displayName: "Catherine Yang",
    },
  });

  console.log("✅ Profile created:", profile.id);

  const post = await prisma.post.create({
    data: {
      profileId: profile.id,
      caption: "Test post 001",
      location: "Newport Beach, CA",
      visibility: "PUBLIC",
      media: {
        create: [
          {
            type: "PHOTO",
            url: "/uploads/1.jpg",
            altText: "Photo 1",
            sortOrder: 0,
          },
        ],
      },
    },
  });

  console.log("✅ Post created:", post.id);
  console.log(`👉 Visit: /p/${post.id}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
