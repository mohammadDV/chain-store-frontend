export type SizeGuideGender = "مرد" | "زن" | "کودک";

export type SizeGuideCategory =
    | "لباس بالا تنه"
    | "لباس پایین تنه"
    | "لباس پسر بچه"
    | "لباس دختر بچه"
    | "اکسسوری"
    | "کفش"
    | "دوچرخه"
    | "اسکیت"
    | "غواصی"
    | "ورزش های هدف"
    | "ورزش های رزمی"
    | "ورزش های تیمی"
    | "سوارکاری";

export type SizeGuideKey = `${SizeGuideGender}:${SizeGuideCategory}`;

export type MeasurementTip = {
    title: string;
    description: string;
};

export type SizeTable = {
    title: string;
    subtitle?: string;
    headers: string[];
    rows: string[][];
};

export type SizeGuideNote = {
    title: string;
    paragraphs: string[];
};

export type SizeGuideContent = {
    title: string;
    intro?: string;
    productScope?: string;
    measurements: MeasurementTip[];
    tables: SizeTable[];
    notes?: SizeGuideNote[];
};

const adultCategories: SizeGuideCategory[] = [
    "لباس بالا تنه",
    "لباس پایین تنه",
    "اکسسوری",
    "کفش",
    "دوچرخه",
    "اسکیت",
    "غواصی",
    "ورزش های هدف",
    "ورزش های رزمی",
    "ورزش های تیمی",
    "سوارکاری",
];

const childCategories: SizeGuideCategory[] = [
    "لباس پسر بچه",
    "لباس دختر بچه",
    "اکسسوری",
    "کفش",
    "دوچرخه",
    "اسکیت",
    "غواصی",
    "ورزش های هدف",
    "ورزش های رزمی",
    "ورزش های تیمی",
    "سوارکاری",
];

export function getCategoriesForGender(gender: SizeGuideGender | null): SizeGuideCategory[] {
    if (gender === "کودک") return childCategories;
    return adultCategories;
}
