"use client";

import { Modal } from "@/app/_components/modal";
import { Icon } from "@/ui/icon";
import { useState } from "react";

type Step = 1 | 2 | 3;
type Gender = "مرد" | "زن" | "کودک";
type Category =
    | "لباس بالا تنه"
    | "لباس پایین تنه"
    | "اکسسوری"
    | "کفش"
    | "دوچرخه"
    | "اسکیت"
    | "غواصی"
    | "ورزش های هدف"
    | "ورزش های رزمی"
    | "ورزش های تیمی"
    | "سوارکاری";

const genders: Gender[] = ["مرد", "زن", "کودک"];
const categories: Category[] = [
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

export const SizeGuide = () => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<Step>(1);
    const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleGenderSelect = (gender: Gender) => {
        setSelectedGender(gender);
        setStep(2);
    };

    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
        setStep(3);
    };

    const handleBack = () => {
        if (step === 3) setStep(2);
        else if (step === 2) setStep(1);
    };

    const resetModal = () => {
        setStep(1);
        setSelectedGender(null);
        setSelectedCategory(null);
        setOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-1 text-xs cursor-pointer border border-neutral-200 rounded-full px-3 py-1 text-secondary hover:text-secondary/80 transition-colors"
            >
                راهنمای سایز
            </button>

            <Modal
                open={open}
                onOpenChange={(val) => {
                    if (!val) resetModal();
                    else setOpen(val);
                }}
                title="راهنمای سایز"
                showConfirm={false}
                showCancel={false}
            >
                <div className="flex flex-col h-full">
                    {step > 1 && (
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-1 text-sm text-description hover:text-title transition-colors mb-4 w-fit"
                        >
                            <Icon icon="solar--alt-arrow-right-outline" sizeClass="size-4" />
                            بازگشت
                        </button>
                    )}

                    <div className="flex-1 overflow-y-auto">
                        {step === 1 && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {genders.map((gender) => (
                                    <button
                                        key={gender}
                                        onClick={() => handleGenderSelect(gender)}
                                        className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-border hover:border-secondary hover:bg-secondary/5 transition-all group"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-surface-secondary flex items-center justify-center group-hover:bg-white transition-colors">
                                            <Icon
                                                icon={
                                                    gender === "مرد"
                                                        ? "ion--man-outline"
                                                        : gender === "زن"
                                                            ? "ion--woman-outline"
                                                            : "ion--happy-outline"
                                                }
                                                sizeClass="size-7"
                                                className="text-description group-hover:text-secondary"
                                            />
                                        </div>
                                        <span className="font-medium text-title">{gender}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategorySelect(category)}
                                        className="p-4 rounded-lg border border-border hover:border-secondary hover:bg-secondary/5 transition-all text-center text-sm text-title hover:text-secondary"
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 3 && (
                            <div
                                className="prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: " " }}
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};
