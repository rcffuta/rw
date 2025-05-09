import { PrismaClient } from "./generated/client";


const prisma = new PrismaClient();

async function main() {
  // Seed Categories
  const gamesCategory = await prisma.category.create({
    data: { name: 'Games' },
  });
  const booksCategory = await prisma.category.create({
    data: { name: 'Books' },
  });
  const giftCardsCategory = await prisma.category.create({
    data: { name: 'Gift Cards' },
  });

  // Seed Products
  await prisma.product.create({
    data: {
      title: 'Sample Game',
      description: 'An amazing game!',
      price: 49.99,
      discountedPrice: 29.99,
      stock: 100,
      categoryId: gamesCategory.id,
      // type: 'GAME',
      game: {
        create: {
          platform: 'PC',
          genre: 'Action',
          releaseDate: new Date('2025-01-01'),
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      title: 'Sample Book',
      description: 'A thrilling adventure!',
      price: 19.99,
      discountedPrice: 9.99,
      stock: 50,
      categoryId: booksCategory.id,
      // type: 'BOOK',
      book: {
        create: {
          author: 'John Doe',
          genre: 'Adventure',
          isbn: '123-456-789',
          pages: 300,
          language: 'English',
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      title: 'Sample Gift Card',
      description: 'A gift card for your loved ones',
      price: 25.00,
      discountedPrice: 25.00,
      stock: 200,
      categoryId: giftCardsCategory.id,
      // type: 'GIFT_CARD',
      giftCard: {
        create: {
          code: 'XYS12345',
          value: 25.00,
          expiration: new Date('2025-12-31'),
        },
      },
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
