export const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
];

export const formatToShamsiWithYear = (date: Date): string => {
    try {
        const shamsiDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        }).formatToParts(date);

        const day = shamsiDate.find((part) => part.type === "day")?.value;
        const month = shamsiDate.find((part) => part.type === "month")?.value;
        const year = shamsiDate.find((part) => part.type === "year")?.value;

        if (day && month && year) {
            const monthIndex = parseInt(month) - 1;
            const monthName = persianMonths[monthIndex] || month;
            return `${day} ${monthName} ${year}`;
        }

        return date.toLocaleDateString("fa-IR");
    } catch (error) {
        return date.toLocaleDateString("fa-IR");
    }
};