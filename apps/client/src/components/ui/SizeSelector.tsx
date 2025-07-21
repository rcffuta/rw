
type Props = {
    sizes: string[];
    selectedSize: string;
    onChangeSize: (size: string)=>void;
}

export default function SizeSelector({
    sizes,
    selectedSize,
    onChangeSize,
}:Props) {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                    <button
                        key={size}
                        onClick={() => onChangeSize(size)}
                        className={`px-4 py-2 border rounded-md ${
                            selectedSize === size
                                ? 'bg-blue-dark text-white border-blue-500'
                                : 'bg-white border-gray-300'
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    )
}