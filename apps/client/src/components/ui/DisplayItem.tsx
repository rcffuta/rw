"use client"
import { PackageItem, ProductVariant } from "@rcffuta/ict-lib"
import VariantSelector from "./VariantSelector";
import SizeSelector from "./SizeSelector";
import { observer } from "mobx-react-lite";
import productStore from "@/lib/store/productStore";

type Props = {
    onChangeVariant:(variant: ProductVariant)=>void; 
    selectedVariant?: ProductVariant;
    selectedSize?: string;
    item: PackageItem;
    onChangeTab: ()=>void;
    onChangeSize:(size:string)=>void;
    active: boolean
}

export const PackageDisplayItem = observer(({item, selectedVariant, selectedSize, onChangeVariant, active, onChangeSize, onChangeTab}:Props) => {

    const product = productStore.getProductItem(item.productId);

    let template = null;
    
    if (!product) {
        template = <p>Could not find product</p>;
    } else {
        // console.debug(product)

        let variant = selectedVariant;
        
        if (!variant) {
            variant = product.variants.at(0)
        }
        
        const sizes = variant.sizes;
        
        let size = selectedSize;

        if (!size) {
            size = variant.sizes.at(0)
        }

        // console.debug(sizes);
        template = (
            <>
                {/* Color Variants */}
                <VariantSelector
                    name={item.name}
                    variants={product.variants}
                    onChangeVariant={onChangeVariant}
                    selectedVariant={variant}
                />

                {/* Size Variants */}
                <SizeSelector onChangeSize={onChangeSize} selectedSize={size} sizes={sizes} />
            </>
        )
    }
    return (
        <div key={item.productId} className="py-4 border-t border-gray-3 first:border-t-0">
            {/* {template} */}

            <button
                onClick={() => onChangeTab()}
                className="flex justify-between items-center w-full text-left"
            >
                <span className="font-medium">{item.name}</span>
                <svg
                    className={`w-5 h-5 transform transition-transform ${
                        active ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {active && (
                <div className="mt-4 pl-2 space-y-4 flex items-end justify-between">
                    {template}
                </div>
            )}
        </div>
    )
})
