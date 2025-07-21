"use client";
import { OrderItem, ProductVariant } from "@rcffuta/ict-lib"
import { ProductImage } from "@rw/shared";
import clsx from "clsx";

type Props = {
    variants: ProductVariant[];
    selectedVariant?: OrderItem['variant']
    onChangeVariant: (variant: Partial<OrderItem['variant']>) => void
    name: string
    small?: boolean;
    image?: string;
}

export default function VariantSelector({ variants, name, image, onChangeVariant, selectedVariant }: Props) {
    return (
        <div className="w-full lg:w-1/2">
            {variants.map((e) => (
                <div
                    className={clsx('rounded-lg overflow-hidden bg-gray-100', {
                        hidden: selectedVariant?.image !== e.image,
                    })}
                    key={e.image}
                >
                    <ProductImage src={e.image} alt={name} className={'w-full h-auto'} />
                </div>
            ))}

            <p className="my-4">Select color to preview variant</p>
            <div className="flex gap-2 mt-4">
                {variants.map((variant) => (
                    <button
                        key={variant.color}
                        title={variant.color}
                        onClick={() => onChangeVariant({
                            color: variant.color,
                            image: variant.image || image,
                        })}
                        className={`w-10 h-10 rounded-md border-2 ${
                            selectedVariant?.color === variant.color
                                ? 'border-gold-400 border-4'
                                : 'border-gray-5'
                        }`}
                        style={{ backgroundColor: variant.color }}
                        aria-label={`Select ${variant.color} color`}
                    />
                ))}
            </div>
        </div>
    )
}