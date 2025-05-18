"use client";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Select } from "../FormElements/select";
import DatePickerOne from "../FormElements/DatePicker/DatePickerOne";
import { useNavigate } from "@willo/lib";
import ProductWrapperForm from "./ProductFormWrapper";
import toast from "react-hot-toast";
import productStore from "@/store/productStore";
import ProductForm from "./ProductForm";
import { observer } from "mobx-react-lite";

const redirect = "/products/books";

const MainProductForm = observer(() => {
    return (
        <ShowcaseSection title="Enter Book Product Info" className="!p-6.5">
            <InputGroup
                label="Author"
                type="text"
                placeholder="Enter your book author or authors"
                className="mb-4.5"
                value={productStore.author}
                handleChange={(e) =>
                    productStore.setField("author", e.target.value)
                }
                required
            />

            <InputGroup
                label="Genre"
                type="text"
                placeholder="Enter book genre"
                // className="w-full xl:w-1/2"
                className="mb-4.5"
                value={productStore.bookGenre}
                handleChange={(e) =>
                    productStore.setField("bookGenre", e.target.value)
                }
                required
            />

            <InputGroup
                label="Language"
                type="text"
                placeholder="Enter book language"
                // className="w-full xl:w-1/2"
                className="mb-4.5"
                value={productStore.language}
                handleChange={(e) =>
                    productStore.setField("language", e.target.value)
                }
                required
            />

            <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                <InputGroup
                    label="ISBN"
                    type="text"
                    placeholder="Enter book isbn"
                    className="w-full xl:w-1/2"
                    value={productStore.isbn}
                    handleChange={(e) =>
                        productStore.setField("isbn", e.target.value)
                    }
                    required
                />

                <InputGroup
                    label="Pages"
                    type="number"
                    placeholder="Enter book pages"
                    className="w-full xl:w-1/2"
                    value={productStore.pages}
                    handleChange={(e) =>
                        productStore.setField("pages", e.target.value)
                    }
                    required
                />
            </div>
        </ShowcaseSection>
    );
})

export default function BookProductForm() {
    const { navigate } = useNavigate();

    return (
        <ProductWrapperForm
            handleSubmit={async (e) => {
                const toastId = "formSaveToast";
                e.preventDefault();

                toast.loading("Saving product...", { id: toastId });

                let product;

                try {
                    product = await productStore.saveProduct();
                } catch (err) {
                    toast.error("Product could not save!", { id: toastId });

                    return;
                }

                try {
                    await productStore.saveBookProduct(product.id);
                } catch (err) {
                    toast.error("Game could not save!", { id: toastId });
                    return;
                }

                toast.success("Saved product", { id: toastId });

                setTimeout(() => {
                    if (!redirect) return;

                    navigate(redirect);
                }, 1500);
            }}
        >
            <ProductForm />

            <MainProductForm />
        </ProductWrapperForm>
    );
}