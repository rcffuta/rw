
"use client";

import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Select } from "../FormElements/select";
import { useState } from "react";
import { useNavigate } from "@willo/lib";
import toast from "react-hot-toast";
import PhotoUploader from "../FormElements/upload-photo";
import { CategoryFormData } from "@willo/db";
import { saveCategory } from "@/actions/category.action";


type Props = {
    redirect?: string;
}


export function CategoryForm({redirect}: Props) {
    const [imageUrl, setImageUrl] = useState<string| null>(null);
    const [name, setName] = useState("");

    const { navigate } = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const toastId = "saveCategoryToast";

        toast.loading("Saving Category!", { id: toastId });

        const data: CategoryFormData = {
            name,
            image: imageUrl || ""
        };

        try {
            await saveCategory(data);
            toast.success("Category saved!", {id: toastId});

            
            setTimeout(()=>{
                if (!redirect) return;

                navigate(redirect);
            }, 1500)

        } catch (err) {
            console.error("Failed to create category:", err);
            // alert("Error creating product");
            toast.error("Category could not save!", { id: toastId });
        }
    }

    return (
        <ShowcaseSection title="Add New Category" className="!p-6.5">
            <form onSubmit={handleSubmit}>
                <PhotoUploader
                    imageUrl={imageUrl}
                    onUpload={(url) => setImageUrl(url)}
                />
                <InputGroup
                    label="Category Name"
                    type="text"
                    value={name}
                    handleChange={(e) => setName(e.target.value)}
                    placeholder="Enter category title"
                    className="mb-4.5"
                    required
                />

                <button type="submit" className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                    Save Category
                </button>
            </form>
        </ShowcaseSection>
    )
}
