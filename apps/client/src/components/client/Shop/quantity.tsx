'use client'
import { useState } from 'react'

interface SacredQuantityInputProps {
    initialQuantity?: number
    maxQuantity?: number
    onQuantityChange: (quantity: number) => void
    className?: string;
    quantity: number;
}

export function SacredQuantityInput({
    initialQuantity = 1,
    maxQuantity = 10,
    onQuantityChange,
    className = '',
    quantity=1
}: SacredQuantityInputProps) {
    // const [quantity, setQuantity] = useState(initialQuantity)

    const updateQuantity = (newQuantity: number) => {
        const validatedQuantity = Math.min(maxQuantity, Math.max(1, newQuantity))
        // setQuantity(validatedQuantity)
        onQuantityChange(validatedQuantity)
    }

    const handleDecrement = () => updateQuantity(quantity - 1)
    const handleIncrement = () => updateQuantity(quantity + 1)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateQuantity(parseInt(e.target.value) || 1)
    }

    return (
        <div
            className={`flex items-center overflow-hidden rounded-lg bg-gray-1 shadow-2 ${className}`}
        >
            {/* Decrement Button (Left) */}
            <button
                onClick={handleDecrement}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className={`h-12 w-12 flex items-center justify-center transition-all duration-300 ${
                    quantity <= 1
                        ? 'bg-gray-3 text-gray-5 cursor-not-allowed'
                        : 'bg-blue-dark text-white hover:bg-blue active:bg-blue-light'
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {/* Quantity Display */}
            <div className="relative h-12 w-16 flex items-center justify-center bg-white">
                <input
                    type="text"
                    readOnly
                    min="1"
                    max={maxQuantity}
                    value={quantity}
                    disabled
                    // onChange={handleInputChange}
                    className="w-full h-full text-center text-dark font-bold text-custom-lg focus:outline-none focus:ring-2 focus:ring-purple-700/20"
                />
                <div className="absolute bottom-1 left-0 right-0 mx-auto w-6 h-0.5 bg-blue-dark rounded-full"></div>
            </div>

            {/* Increment Button (Right) */}
            <button
                onClick={handleIncrement}
                disabled={quantity >= maxQuantity}
                aria-label="Increase quantity"
                className={`h-12 w-12 flex items-center justify-center transition-all duration-300 ${
                    quantity >= maxQuantity
                        ? 'bg-gray-3 text-gray-5 cursor-not-allowed'
                        : 'bg-blue-dark text-white hover:bg-blue active:bg-blue-light'
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    )
}
