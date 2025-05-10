
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Select } from "../FormElements/select";
import DatePickerOne from "../FormElements/DatePicker/DatePickerOne";

export function BookProductForm() {
  return (
    <ShowcaseSection title="Enter Book Product Info" className="!p-6.5">
      <form action="#">
        {/* <InputGroup
          label="Email"
          type="email"
          placeholder="Enter your email address"
          className="mb-4.5"
        /> */}

        <InputGroup
          label="Author"
          type="text"
          placeholder="Enter your book author or authors"
          className="mb-4.5"
        />

        <InputGroup
          label="Genre"
          type="text"
          placeholder="Enter book genre"
          // className="w-full xl:w-1/2"
          className="mb-4.5"
        />

        <InputGroup
          label="Language"
          type="text"
          placeholder="Enter book language"
          // className="w-full xl:w-1/2"
          className="mb-4.5"
        />
        

        <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
          <InputGroup
            label="isbn"
            type="text"
            placeholder="Enter book isbn"
            className="w-full xl:w-1/2"
            // className="mb-4.5"
          />

          <InputGroup
            label="pages"
            type="number"
            placeholder="Enter book pages"
            className="w-full xl:w-1/2"
            // className="mb-4.5"
          />
        </div>

        <br />

        <button className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          Sign In
        </button>
      </form>
    </ShowcaseSection>
  );
}
