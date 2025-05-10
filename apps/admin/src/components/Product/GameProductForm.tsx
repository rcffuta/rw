
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Select } from "../FormElements/select";
import DatePickerOne from "../FormElements/DatePicker/DatePickerOne";

export function GameProductForm() {
  return (
    <ShowcaseSection title="Enter Game Product Info" className="!p-6.5">
      <form action="#">
        {/* <InputGroup
          label="Email"
          type="email"
          placeholder="Enter your email address"
          className="mb-4.5"
        /> */}

        <Select
          label="Platform"
          placeholder="Select game platform"
          className="mb-4.5"
          items={[{ label: "Personal Computer games", value: "PC" }]}
        />

        <Select
          label="Category"
          placeholder="Select game category"
          className="mb-4.5"
          items={[{ label: "Category 1", value: "cat1" }]}
        />

        <InputGroup
          label="Genre"
          type="text"
          placeholder="Enter game genre"
          // className="w-full xl:w-1/2"
          className="mb-4.5"
        />

        <DatePickerOne title="Release Date" />
        <br/><br/>
        {/* <div className="mb-5.5 mt-5 flex items-center justify-between"> */}
          {/* <Checkbox label="Remember me" minimal withBg withIcon="check" />

          <Link href="#" className="text-body-sm text-primary hover:underline">
            Forgot password?
          </Link> */}
        {/* </div> */}

        <button className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          Sign In
        </button>
      </form>
    </ShowcaseSection>
  );
}
