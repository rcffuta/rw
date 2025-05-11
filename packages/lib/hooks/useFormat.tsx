type CurrencyFormatOption = {
    locale?: string;
    currency?: string;
};

export function useFormatCurrency(
    option: CurrencyFormatOption = {
        locale:"en-US",
        currency:"USD",
    }
) {
    

    function parseAmount(value: number | string){
        const amount = typeof value === "string" ? parseFloat(value) : value;

        if (isNaN(amount)) return "₦0";

        const hasDecimal = amount % 1 !== 0;
        return new Intl.NumberFormat(option.locale, {
            style: "currency",
            currency: option.currency,
            minimumFractionDigits: hasDecimal ? 2 : 0,
            maximumFractionDigits: hasDecimal ? 2 : 0,
        }).format(amount);
    }


    return parseAmount;

}
