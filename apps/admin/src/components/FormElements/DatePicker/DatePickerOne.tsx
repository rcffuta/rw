"use client";

import { Calendar } from "@/components/Layouts/sidebar/icons";
import flatpickr from "flatpickr";
import { useEffect, useRef } from "react";

type DatePickerProps = {
    title?: string;
    value: string | Date | null;
    onChange: (date: Date | null) => void;
    required?: boolean;
};

export const DatePickerOne = ({
    title = "Date Picker",
    value,
    onChange,
    required
}: DatePickerProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const fpRef = useRef<flatpickr.Instance | null>(null);

    useEffect(() => {
        if (!inputRef.current) return;

        // Initialize Flatpickr
        fpRef.current = flatpickr(inputRef.current, {
            defaultDate: value ?? undefined,
            mode: "single",
            static: true,
            monthSelectorType: "static",
            dateFormat: "M j, Y",
            onChange: (selectedDates) => {
                // console.debug(selectedDates);
                // if (!onChange) return;
                onChange(selectedDates[0] || null);
            },
        });

        return () => {
            // Clean up on unmount
            fpRef.current?.destroy();
        };
    }, []);

    useEffect(() => {
        // If the value changes externally (e.g., MobX state), update the picker
        if (fpRef.current && value) {
            fpRef.current.setDate(value, true);
        }
    }, [value]);

    return (
        <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                {title}
            </label>
            <div className="relative">
                <input
                    ref={inputRef}
                    className="form-datepicker w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
                    placeholder="mm/dd/yyyy"
                    data-class="flatpickr-right"
                    readOnly // Let Flatpickr handle interaction
                    required={required}
                />
                <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                    <Calendar className="size-5 text-[#9CA3AF]" />
                </div>
            </div>
        </div>
    );
};

export default DatePickerOne;
