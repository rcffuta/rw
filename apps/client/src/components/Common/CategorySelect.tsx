"use client";
import { categoryFilterKey, SHOP } from "@/constants";
import { Option, useCategoryOption } from "@/hooks/useCategories";
import productStore from "@/lib/store/productStore";
import { useNavigate } from "@willo/lib";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const CategorySelect = () => {
    const options = useCategoryOption();
    const {navigate} = useNavigate();
    const searchParams = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);
    // const [selectedOption, setSelectedOption] = useState(options[0]);

    const selectedOption = productStore.selectedCategory;


    const handleSelect = (categoryId?: string) => {
        // const value = e.target.value;

        const params = new URLSearchParams(searchParams.toString());

        if (categoryId) {
            params.set(categoryFilterKey, categoryId);
        } else {
            params.delete(categoryFilterKey);
        }

        navigate(`${SHOP}?${params.toString()}`);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: Option) => {
        // setSelectedOption(option);

        productStore.setSelectedCategory(option)
        toggleDropdown();
    };

    useEffect(()=>{
        (()=>{
            const catId = searchParams.get(categoryFilterKey) || "";

            const option = options.find((e)=>e.value === catId);

            if (option) {
                productStore.setSelectedCategory(option);
            }
        })()
    }, [])

    useEffect(() => {
        // closing modal while clicking outside
        function handleClickOutside(event) {
            if (!event.target.closest(".dropdown-content")) {
                toggleDropdown();
            }
        }

        if (isOpen) {

            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className="dropdown-content custom-select relative"
            style={{ width: "200px" }}
        >
            <div
                className={`select-selected whitespace-nowrap ${
                    isOpen ? "select-arrow-active" : ""
                }`}
                onClick={toggleDropdown}
            >
                {selectedOption.label}
            </div>
            <div className={`select-items ${isOpen ? "" : "select-hide"}`}>
                {options.map((option, index) => {

                    // if (option.value === selectedOption.value) return null;
                    
                    return (
                        <div
                            key={index}
                            onClick={() => {
                                handleOptionClick(option);
                                handleSelect(option.value)
                            }}
                            className={`select-item ${
                                selectedOption === option ? "same-as-selected" : ""
                            }`}
                        >
                            {option.label}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default observer(CategorySelect);
