"use client";

import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Select } from "../FormElements/select";
import DatePickerOne from "../FormElements/DatePicker/DatePickerOne";
import ProductWrapperForm from "./ProductFormWrapper";
import ProductForm from "./ProductForm";
import { observer } from "mobx-react-lite";
import productStore from "@/store/productStore";
import toast from "react-hot-toast";
import { useNavigate } from "@willo/lib";


const redirect = "/products/games";

const gameOptions = [{ label: "Personal Computer games", value: "PC" }];


const MainProductForm = observer(() => {
  return (
      <ShowcaseSection title="Enter Game Product Info" className="!p-6.5">
          <Select
              label="Platform"
              placeholder="Select game platform"
              className="mb-4.5"
              items={gameOptions}
              value={productStore.platform}
              handleChange={(e) =>
                  productStore.setField("platform", e.target.value)
              }
              required
          />

          <InputGroup
              label="Genre"
              type="text"
              placeholder="Enter game genre"
              // className="w-full xl:w-1/2"
              className="mb-4.5"
              value={productStore.genre}
              handleChange={(e) =>
                  productStore.setField("genre", e.target.value)
              }
              required
          />

          <DatePickerOne
              title="Release Date"
              value={productStore.releaseDate}
              onChange={(date) => {
                  productStore.setField("releaseDate", date?.toString() || "");
              }}
              required
          />
      </ShowcaseSection>
  );
})


export default function GameProductForm() {

    const {navigate} = useNavigate();


    return (
        <ProductWrapperForm handleSubmit={async (e)=>{
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
                await productStore.saveGameProduct(product.id);
            } catch (err) {
                toast.error("Game could not save!", { id: toastId });
                return;
            }

            toast.success("Saved product", { id: toastId });

            setTimeout(() => {
                if (!redirect) return;

                navigate(redirect);
            }, 1500);
        }}>
            <ProductForm />

            <MainProductForm/>

        </ProductWrapperForm>
    )
}