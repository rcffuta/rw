import { CART } from "@/constants";
import { cartStore, setPackageInCart, setProductInCart } from "@/lib/store/cart-utils";
import { OrderType } from "@/lib/store/cartStore";
import productStore from "@/lib/store/productStore";
import { MerchPackageRecord, OrderItem, OrderVariant, ProductInfo, ProductRecord, ProductVariant } from "@rcffuta/ict-lib";
import { normalizeQuantity, useNavigate } from "@rw/shared";
import { useState } from "react";


export function useProductCart(product: ProductRecord) {
    const {navigate} = useNavigate();

    let orderItemInfo = cartStore.getOrderItemById(product.id)

    if (!orderItemInfo) {
        orderItemInfo = cartStore.createProductOrderItem(product)
    }

    function saveOrder() {
        // const done = cartStore.addToCart(orderItemInfo, product);

        setProductInCart(cartStore, product, orderItemInfo);

        navigate(CART)
    }


    function setQuantity(q?:number){

        cartStore.updateProductQuantity(normalizeQuantity(q, quantity), product)
    }

    function updateVariant(variant: Partial<OrderVariant>){

        cartStore.updateVariant(variant, product)
    }



    const selectedVariant = orderItemInfo.variant as OrderVariant;
    const quantity = orderItemInfo.quantity;
    const selectedSize = (orderItemInfo.variant as OrderVariant).size || "";


    return {
        selectedVariant,
        quantity,
        selectedSize,

        saveOrder,
        setQuantity,
        updateVariant,
    }
}


export function usePackageProduct(productId: string) {
    const product = productStore.getProductItem(productId);
    // const [selectedVariant, setSelectedVariants] = useState<OrderVariant>({
    //     color: product?.variants[0]?.color || "",
    //     size: product?.variants[0]?.sizes[0] || "",
    //     image: product?.variants[0]?.image || "",
    // })

    // // const fnnc =  useProductCart(product);

    // const sizes = product.variants.find(e=>e.color === selectedVariant.color)?.sizes || [];
    // const selectedSize = selectedVariant.size || "";


    // function updateVariant(variant: Partial<OrderVariant>) {
    //     setSelectedVariants((prev) => ({
    //         ...prev,
    //         ...variant,
    //     }))
    // }


    return {
        product,
        // selectedVariant,
        // selectedSize,
        // sizes,
        // updateVariant
        
    }

}


export function usePackageCart(pkg: MerchPackageRecord) {
    const [selectedSize, setSelectedSize] = useState<Record<string, string>>(()=>{
        const norm = cartStore.getOrderItemById(pkg.id) || {};
        const sizes: Record<string, string> = {};
        pkg.items.forEach(item => {
            const product = productStore.getProductItem(item.productId);
            if (product) {
                sizes[item.productId] = product.variants[0]?.sizes[0] || "";
            }
        });
        return sizes;
    })
    const [selectedVariants, setSelectedVariants] = useState<Record<string, OrderVariant>>(()=>{
        const norm = cartStore.getOrderItemById(pkg.id) || {};
        const variants: Record<string, OrderVariant> = {};
        pkg.items.forEach(item => {
            const product = productStore.getProductItem(item.productId);
            if (product) {
                const firstVariant = product.variants[0];
                variants[item.productId] = {
                    color: firstVariant.color || "",
                    size: firstVariant.sizes[0] || "",
                    image: firstVariant.image || "",
                    ...norm[item.productId]?.variant, // Merge with existing variant if available
                };
            }
        });
        return variants;
    })
    const {navigate} = useNavigate();

    let orderItemInfo = cartStore.getOrderItemById(pkg.id)

    if (!orderItemInfo) {
        orderItemInfo = cartStore.createPackageOrderItem(pkg)
    }

    function saveOrder() {
        // const done = cartStore.addToCart(orderItemInfo, product);

        // console.debug("Saving package order", orderItemInfo);

        setPackageInCart(cartStore, pkg, orderItemInfo);

        navigate(CART)
    }


    const handleVariantChange = (itemId: string, variant: OrderVariant) => {
            setSelectedVariants((prev) => ({
                ...prev,
                [itemId]: {
                    ...prev[itemId],
                    ...variant,
                },
            }))
        }
        const handleSizeChange = (itemId: string, size: string) => {
            setSelectedSize((prev) => ({
                ...prev,
                [itemId]: size,
            }))
        }
    



    // const selectedVariant = orderItemInfo.variant;
    const quantity = orderItemInfo.quantity;
    // const selectedSize = orderItemInfo.variant.size || "";


    return {
        selectedVariants,
        quantity,
        selectedSize,

        saveOrder,
        handleVariantChange,
        handleSizeChange,
    }
}