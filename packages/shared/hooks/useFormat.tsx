type CurrencyFormatOption = {
    locale?: string;
    currency?: string;
};

type Currency = number | `${number}`;

export function formatCurrency(
    value: Currency,
    option: CurrencyFormatOption = {
        locale: "en-US",
        currency: "USD",
    }
) {
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

export function useFormatCurrency(option?: CurrencyFormatOption) {
    function parseAmount(value: Currency) {
        return formatCurrency(value, option);
    }

    return parseAmount;
}
