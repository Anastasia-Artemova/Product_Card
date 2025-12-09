
import "dotenv/config";
 import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});
const prisma = new PrismaClient({ adapter });

async function main() {

  await prisma.product.createMany({
    data: [
      {
        name: "Blue T-Shirt",
        description: "A blue t-shirt made from 100% cotton.",
        price: 19.99,
        images: [
          "https://tinyurl.com/5c8auzdr",
          "https://tinyurl.com/5wwyt4yd"
        ],
        quantity: 5,
        category: "Clothes",
      },
      {
        name: "Red Sneakers",
        description: "Comfortable red sneakers",
        price: 49.99,
        images: [
          "https://tinyurl.com/bdumbnn8",
          "https://tinyurl.com/y5e2pj6x",
          "https://tinyurl.com/mr486fzt"
        ],
        quantity: 7,
        category: "Shoes",
      },
      {
        name: "Wireless Headphones",
        description: "Noise-cancelling wireless headphones",
        price: 89.99,
        images: ["https://tinyurl.com/yc2vzf55"],
        quantity: 2,
        category: "Electronics",
      }
    ]
  });

}

main()
  .then(() => console.log("Seed complete"))
  .catch((e) => console.error("Seed error:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });
