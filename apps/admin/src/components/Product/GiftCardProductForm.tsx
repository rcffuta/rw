
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Select } from "../FormElements/select";
import DatePickerOne from "../FormElements/DatePicker/DatePickerOne";

export function GiftCardProductForm() {
  return (
    <ShowcaseSection title="Enter Gift Card Product Info" className="!p-6.5">
      <form action="#">

        <InputGroup
          label="Code"
          type="text"
          placeholder="Enter gift card code"
          // className="w-full xl:w-1/2"
          className="mb-4.5"
        />

        <InputGroup
          label="Value"
          type="number"
          placeholder="Enter gift card number"
          // className="w-full xl:w-1/2"
          className="mb-4.5"
        />

        <DatePickerOne title="Expiration Date" />
        <br />
        <br />

        <button className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          Sign In
        </button>
      </form>
    </ShowcaseSection>
  );
}
