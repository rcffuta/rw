import { UploadPhotoForm } from "@/app/settings/_components/upload-photo";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { Select } from "@/components/FormElements/select";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

export function ProductForm() {
  return (
    <ShowcaseSection title="Add New Product" className="!p-6.5">
      <form action="#">
        <InputGroup
          label="Title"
          type="text"
          placeholder="Enter product title"
          className="mb-4.5"
          required
        />

        <Select
          label="Category"
          placeholder="Select book category"
          className="mb-4.5"
          items={[{ label: "Category 1", value: "cat1" }]}
        />

        <TextAreaGroup
          label="Description"
          placeholder="Enter product description"
          className="mb-4.5"
        />

        <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
          <InputGroup
            label="Price"
            type="number"
            placeholder="Enter product price"
            className="w-full xl:w-1/2"
          />

          <InputGroup
            label="Discount Price"
            type="number"
            placeholder="Enter product discount price"
            className="w-full xl:w-1/2"
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
