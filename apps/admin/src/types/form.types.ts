import { PackageItem } from "@rcffuta/ict-lib";

export interface Option {
    value: string
    text: string
    selected?: boolean
    element?: HTMLElement;
    data: PackageItem;
}