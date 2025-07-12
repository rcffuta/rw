"use server";

// Types kept for consistency (adjust as needed)
type ProductFormData = {
  title: string;
  description: string;
  categoryId: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  deliverable: boolean;
};

type GameProductFormData = ProductFormData & {
  platform: string;
  genre: string;
  releaseDate: string;
};

// `https://placehold.co/600x400?text=${encodeURIComponent(data.title)}`

type BookProductFormData = ProductFormData & {
  author: string;
  publisher: string;
  isbn?: string;
};

type GiftCardProductFormData = {
  title: string;
  description: string;
  amount: number;
  images: string[];
};

// Dummy database
let dummyProducts: any[] = [];

// Helper function to generate dummy product
const generateDummyProduct = (data: any, type: string) => {
  const baseProduct = {
    id: `prod_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data,
    // Ensure images array exists
    images: data.images?.length ? data.images : ['/products/default.jpg'],
  };

  switch (type) {
    case 'game':
      return {
        ...baseProduct,
        type: 'game',
        platform: data.platform || 'PC',
        genre: data.genre || 'Adventure',
        releaseDate: data.releaseDate || new Date().toISOString().split('T')[0],
      };
    case 'book':
      return {
        ...baseProduct,
        type: 'book',
        author: data.author || 'Unknown Author',
        publisher: data.publisher || 'Independent',
        isbn: data.isbn || '',
      };
    case 'giftcard':
      return {
        ...baseProduct,
        type: 'giftcard',
        amount: data.amount || 5000,
      };
    default:
      return {
        ...baseProduct,
        type: 'regular',
      };
  }
};

// Refactored server actions with dummy implementations
export async function saveProduct(data: ProductFormData) {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate DB delay
  
  const product = generateDummyProduct(data, 'regular');
  dummyProducts.push(product);
  return product;
}

export async function saveGame(data: GameProductFormData) {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const product = generateDummyProduct(data, 'game');
  dummyProducts.push(product);
  return product;
}

export async function saveBook(data: BookProductFormData) {
  await new Promise(resolve => setTimeout(resolve, 550));
  
  const product = generateDummyProduct(data, 'book');
  dummyProducts.push(product);
  return product;
}

export async function saveGiftCard(data: GiftCardProductFormData) {
  await new Promise(resolve => setTimeout(resolve, 450));
  
  const product = generateDummyProduct({
    ...data,
    price: data.amount, // Gift cards typically use amount instead of price
    categoryId: 'giftcards',
    deliverable: true
  }, 'giftcard');
  
  dummyProducts.push(product);
  return product;
}

// Helper function to view all dummy products (for debugging)
export async function _getAllDummyProducts() {
  return dummyProducts;
}