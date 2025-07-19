"use server";


export async function loadWishList(userId: number) {
    try {

        // return await getUserWishlist(userId);
    } catch(err) {
        console.error(err);
        throw new Error("Could not load wishlist");
    }
}

export async function saveWishList(userId: number, productId:number) {
    try {
        // return await addToWishlist(userId, productId);
    } catch(err) {
        console.error(err);
        throw new Error("Could not save to wishlist");
    }
}

export async function deleteFromWishList(userId: number, productId:number) {
    try {
        // return await removeFromWishlist(userId, productId);
    } catch(err) {
        console.error(err);
        throw new Error("Could not delete from wishlist");
    }
}

export async function clearAllInWishList(userId: number) {
    try {
        // return await clearWishlist(userId);
    } catch(err) {
        console.error(err);
        throw new Error("Could not clear wishlist");
    }
}
