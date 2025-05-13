

import { saveGame, saveProduct } from "@/actions/form.action";
import { GameProductFormData } from "@gamezone/db";
import { makeAutoObservable } from "mobx";

class ProductStore {
    // Product Details
    imageUrl =
        "https://res.cloudinary.com/con-so-nant/image/upload/v1746875866/gamezone/profiles/sg6lze681nyyklpqgziz.jpg";
    title = "";
    category = "";
    description = "";
    price = "";
    discountPrice = "";

    // Games Product Details
    platform = "";
    genre = "";
    releaseDate = "";

    constructor() {
        makeAutoObservable(this);
    }

    async saveProduct() {
        const data = {
            title: this.title,
            description: this.description,
            categoryId: parseInt(this.category),
            price: parseFloat(this.price),
            discountedPrice: this.discountPrice
                ? parseFloat(this.discountPrice)
                : 0,
            images: this.imageUrl ? [this.imageUrl] : [],
        };

        let product;

        try {
            product = await saveProduct(data);
            // toast.success("Product saved!", { id: toastId });
        } catch (err) {
            console.error("Failed to create product:", err);
            // alert("Error creating product");
            // toast.error("Product could not save!", { id: toastId });
            throw new Error("Product could not save!");
        }

        return product;
    }

    async saveGameProduct(productId: number) {
        const data: GameProductFormData = {
            platform: this.platform,
            genre: this.genre,
            releaseDate: this.releaseDate ? new Date(this.releaseDate) : new Date(),
            productId,
        };

        try {
            await saveGame(data);
            // toast.success("Product saved!", { id: toastId });

            // setTimeout(() => {
            //     if (!props.redirect) return;

            //     navigate(props.redirect);
            // }, 1500);
        } catch (err) {
            console.error("Failed to create game:", err);
            // alert("Error creating product");
            // toast.error("Product could not save!", { id: toastId });
            throw new Error("Game could not save!");
        }
        return true;
    }

    setField(key: string, value: string) {
        // @ts-ignore
        this[key] = value;
    }

    // getField(key:string) {
    //     // @ts-ignore
    //     return this[key]
    // }
}

const productStore = new ProductStore();
export default productStore;
