interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    error?: string;
    required?: boolean;
    id?: string;
    className?: string;
    value?:string;
    onChange?:(e:any)=>void
    // autoComplete?: "on" | "off";
}

export default function TextareaField({
    label,
    placeholder,
    error,
    required,
    className = "mb-5",
    id,
    name,
    ...rest
}: Omit<InputFieldProps, "type">) {
    const Id = id ? id : name;

    return (
        <div className={className}>
            <label
                htmlFor={Id}
                className="block mb-2.5 text-gray-700 font-medium"
            >
                {label} {required && <span className="text-red">*</span>}
            </label>
            <textarea
                name={name}
                id={Id}
                placeholder={placeholder}
                required={required}
                className={`rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20 ${
                    error
                        ? "border-red-light focus:ring-red-light"
                        : "border-gray-3 bg-gray-1"
                }`}
                {...rest}
            />
            {error && <p className="mt-2 text-sm text-red-dark">{error}</p>}
        </div>
    );
};
