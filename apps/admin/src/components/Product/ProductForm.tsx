"use client";
import { saveProduct } from "@/actions/form.action";
import PhotoUploader from "@/app/settings/_components/upload-photo";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { Select } from "@/components/FormElements/select";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { ProductFormData } from "@gamezone/db";
import { useState } from "react";
import toast from "react-hot-toast";
import {useNavigate} from "@gamezone/lib"


type Props = {
    redirect?: string;
}

export function ProductForm(props: Props) {
    const [imageUrl, setImageUrl] = useState<string|null>(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState<number | null>(null);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");

    const { navigate } = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const toastId = "saveProdutToast";

        toast.loading("Saving Product!", { id: toastId });

        const productData: ProductFormData = {
            title,
            description,
            categoryId: category,
            price: parseFloat(price),
            discountedPrice: discountPrice ? parseFloat(discountPrice) : 0,
            images: imageUrl ? [imageUrl] : [],
        };

        try {
            await saveProduct(productData);
            toast.success("Product saved!", {id: toastId});

            
            setTimeout(()=>{
                if (!props.redirect) return;

                navigate(props.redirect);
            }, 1500)

        } catch (err) {
            console.error("Failed to create product:", err);
            // alert("Error creating product");
            toast.error("Product could not save!", { id: toastId });
        }
    }

    return (
        <ShowcaseSection title="Add New Product" className="!p-6.5">
            <form onSubmit={handleSubmit}>
                <PhotoUploader
                    imageUrl={imageUrl}
                    onUpload={(url) => setImageUrl(url)}
                />
                <InputGroup
                    label="Title"
                    type="text"
                    value={title}
                    handleChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter product title"
                    className="mb-4.5"
                    required
                />

                <Select
                    label="Category"
                    placeholder="Select book category"
                    className="mb-4.5"
                    items={[{ label: "Category 1", value: "1" }]}
                    value={title}
                    handleChange={(e) => setCategory(parseInt(e.target.value))}
                />

                <TextAreaGroup
                    label="Description"
                    placeholder="Enter product description"
                    className="mb-4.5"
                    value={description}
                    handleChange={(e) => setDescription(e.target.value)}
                />

                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                    <InputGroup
                        label="Price"
                        type="number"
                        placeholder="Enter product price"
                        className="w-full xl:w-1/2"
                        value={price}
                        handleChange={(e) => setPrice(e.target.value)}
                    />

                    <InputGroup
                        label="Discount Price"
                        type="number"
                        placeholder="Enter product discount price"
                        className="w-full xl:w-1/2"
                        value={discountPrice}
                        handleChange={(e) => setDiscountPrice(e.target.value)}
                    />
                </div>

                {/* <InputGroup
                label="Subject"
                type="text"
                placeholder="Enter your subject"
                className="mb-4.5"
                />

                <Select
                label="Subject"
                placeholder="Select your subject"
                className="mb-4.5"
                items={[
                    { label: "United States", value: "USA" },
                    { label: "United Kingdom", value: "UK" },
                    { label: "Canada", value: "Canada" },
                ]}
                /> */}

                {/* <TextAreaGroup label="Message" placeholder="Type your message" /> */}

                <button className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                    Send Message
                </button>
            </form>
        </ShowcaseSection>
    );
}
