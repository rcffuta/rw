"use server";

import { getPackageById, getPackages, getProductById, getProducts, MerchPackageRecord, ProductRecord} from "@rcffuta/ict-lib";
// import { CategoryItem, FullBookProduct, FullGameProduct, getAllBooks, getAllCategories, getAllGames, getAllProducts,getAllCategoryWithProducts, ProductItem } from "@willo/db";


// export async function getBookProducts(): Promise<FullBookProduct[]> {
//     try {

//         return await getAllBooks() || [];
//     } catch(err) {
//         console.error(err);
//         throw new Error("Could not get book products");
//     }
// }

// export async function getGameProducts(): Promise<FullGameProduct[]> {
//     try {
//         return await getAllGames() || [];
//     } catch (err) {
//         console.error(err);
//         throw new Error("Could not get game products");
//     }
// }

// export async function getAllProductList(): Promise<ProductItem[]> {
//     try {
//         return await getAllProducts() || [];
//     } catch (err) {
//         console.error(err);
//         throw new Error("Could not get all products");
//     }
// }

export async function loadProducts() {
    try {
        const {
            data,
            message,
            success
        }  = await getProducts();

        if (!success) {
            console.debug(message);
            // <ToastFeedback message={"Error loading Merch!"} id="prodHighlightToast" type="error"/>
        }

        return data ?? [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function loadPackages() {
    try {
        const {
            data,
            message,
            success
        }  = await getPackages();

        if (!success) {
            console.debug(message);
            // <ToastFeedback message={"Error loading Merch!"} id="prodHighlightToast" type="error"/>
        }

        return data ?? [];
    } catch (err) {
        console.error(err);
        return [];
    }
}


export async function getCategoryProducts(categoryId:string) {
    try {
        return await getPackageById(categoryId);
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function getProduct(id:string): Promise<{
    type: "product",
    data: ProductRecord
}|{
    type: "package",
    data: MerchPackageRecord
}> {
    try {
        // Try get a product
        const {
            success, data
        } = await getProductById(id);

        if (success) {
            return {
                type: "product",
                data,
            };
        }

        // Try get package
        const {
            success: pkgSuccess,
            data: pkg
        } = await getPackageById(id);

        if (pkgSuccess) {
            return {
                type: "package",
                data: pkg,
            };
        }

        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
}


export async function getFilteredProducts() {
    try {
        // Try get a product
        const {
            success, data
        } = await getProducts();

        if (success) {
            return data
        }

        return [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function getFilteredPackages() {
    try {
        // Try get a product
        const {
            success, data
        } = await getPackages();

        if (success) {
            return data
        }

        return [];
    } catch (err) {
        console.error(err);
        return [];
    }
}


export async function fetchPackages(catType:"product" | "package", prodId:string) {
    try {
        // Try get a product

        if (catType === "product") {

            const {
                success, data
            } = await getProducts();
    
            if (success) {
                return {
                    type: catType,
                    data: data.filter(e=>e.id !== prodId)
                }
            }

            return null
        }

        
        if (catType === "package") {

            const {
                success, data
            } = await getPackages();
    
            if (success) {
                return {
                    type: catType,
                    data: data.filter(e=>e.id !== prodId)
                }
            }

            return null
        }

        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
}
