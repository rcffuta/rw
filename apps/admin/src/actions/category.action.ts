// "use server";
// import { getProducts } from "@rcffuta/ict-lib";

// // Dummy data generators
// const generateDummyCategories = (count: number): CategoryItem[] => {
//   const categories = [
//     "Anniversary Merch",
//     "Bibles & Books",
//     "Clothing",
//     "Accessories",
//     "Stationery",
//     "Devotional Materials"
//   ];

//   return Array.from({ length: count }, (_, i) => ({
//     id: `cat_${1000 + i}`,
//     name: categories[i % categories.length] || `Category ${i + 1}`,
//     slug: categories[i % categories.length]?.toLowerCase().replace(/\s+/g, '-') || `category-${i + 1}`,
//     image: `/categories/cat-${i % 5 + 1}.jpg`,
//     productCount: Math.floor(Math.random() * 20) + 5
//   }));
// };

// const generateDummyProducts = (categoryId: string, count: number) => {
//   const products = [
//     { name: "RCF Anniversary T-Shirt", price: 2500 },
//     { name: "Student Bible", price: 3500 },
//     { name: "Prayer Journal", price: 1500 },
//     { name: "Wristband", price: 500 },
//     { name: "Cap", price: 2000 }
//   ];

//   return Array.from({ length: count }, (_, i) => ({
//     id: `prod_${categoryId}_${100 + i}`,
//     ...products[i % products.length],
//     image: `/products/prod-${i % 5 + 1}.jpg`
//   }));
// };

// // Dummy database functions
// let dummyCategories: FullCategory[] = Array.from({ length: 6 }, (_, i) => {
//   const category = generateDummyCategories(1)[0];
//   return {
//     ...category,
//     description: `This is a sample description for ${category.name}`,
//     products: generateDummyProducts(category.id, Math.floor(Math.random() * 8) + 3)
//   };
// });

// // Refactored server actions
// export async function getCategoryList(): Promise<FullCategory[]> {
//   // Simulate network delay
//   await new Promise(resolve => setTimeout(resolve, 300));
//   return dummyCategories;
// }

// export async function getCategories(): Promise<CategoryItem[]> {
//   await new Promise(resolve => setTimeout(resolve, 200));
//   return dummyCategories.map(({ products, ...category }) => category);
// }

// export async function saveCategory(data: CategoryFormData): Promise<CategoryItem> {
//   await new Promise(resolve => setTimeout(resolve, 500));
  
//   const newCategory: FullCategory = {
//     id: `cat_${Date.now()}`,
//     ...data,
//     productCount: 0,
//     products: [],
//     description: data.description || ""
//   };

//   dummyCategories = [...dummyCategories, newCategory];
//   const { products, ...categoryItem } = newCategory;
  
//   return categoryItem;
// }