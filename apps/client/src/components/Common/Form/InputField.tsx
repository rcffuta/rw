interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type: string;
    placeholder: string;
    error?: string;
    required?: boolean;
    className?: string;
    // name: string;
    // id?: string;
    // value?:string;
    // autoComplete?: "on" | "off";
}


export default function InputField({
    label,
    type,
    // name,
    placeholder,
    error,
    required,
    className="mb-5",
    id,
    name,
    ...rest
    // id,
    // value,
}: InputFieldProps) {
    const Id = id ? id : name;

    return (
        <div className={className}>
            <label
                htmlFor={Id}
                className="block mb-2 text-gray-700 font-medium"
            >
                {label} {required && <span className="text-red">*</span>}
            </label>
            <input
                type={type}
                name={name}
                id={Id}
                // defaultValue={value}
                placeholder={placeholder}
                required={required}
                autoComplete={type === "password" ? "on" : "off"}
                className={`rounded-lg border w-full placeholder:text-dark-5 py-3 px-5 outline-none duration-200  focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20 ${
                    error
                        ? "border-red-light focus:ring-red-light"
                        : "border-gray-3 bg-gray-1"
                }`}
                {...rest}
            />
            {error && <FormError error={error}/>}
        </div>
    );
};

export function FormError({error}:{error?:string}) {
    if (!error) return null;
    return <p className="mt-2 text-sm text-red-dark">{error}</p>;
}