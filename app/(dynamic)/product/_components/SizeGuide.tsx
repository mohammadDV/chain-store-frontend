"use client";

import { Modal } from "@/app/_components/modal";
import { Icon } from "@/ui/icon";
import { useState } from "react";
import { getSizeGuideContent } from "./sizeGuide/data";
import { SizeGuideContentView } from "./sizeGuide/SizeGuideContentView";
import {
    getCategoriesForGender,
    type SizeGuideCategory,
    type SizeGuideGender,
} from "./sizeGuide/types";

type Step = 1 | 2 | 3;

const genders: SizeGuideGender[] = ["مرد", "زن", "کودک"];

export const SizeGuide = () => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<Step>(1);
    const [selectedGender, setSelectedGender] = useState<SizeGuideGender | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<SizeGuideCategory | null>(null);

    const content = getSizeGuideContent(selectedGender, selectedCategory);
    const categories = getCategoriesForGender(selectedGender);

    const handleGenderSelect = (gender: SizeGuideGender) => {
        setSelectedGender(gender);
        setSelectedCategory(null);
        setStep(2);
    };

    const handleCategorySelect = (category: SizeGuideCategory) => {
        setSelectedCategory(category);
        setStep(3);
    };

    const handleBack = () => {
        if (step === 3) {
            setSelectedCategory(null);
            setStep(2);
        } else if (step === 2) {
            setSelectedGender(null);
            setSelectedCategory(null);
            setStep(1);
        }
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
                size={step === 3 ? "large" : "medium"}
                showConfirm={false}
                showCancel={false}
                className="min-w-0"
            >
                <div className="flex h-full min-w-0 max-w-full flex-col overflow-hidden">
                    {step > 1 && (
                        <button
                            onClick={handleBack}
                            className="mb-4 flex w-fit items-center gap-1 text-sm text-description transition-colors hover:text-title"
                        >
                            <Icon icon="solar--alt-arrow-right-outline" sizeClass="size-4" />
                            بازگشت
                        </button>
                    )}

                    <div className="min-w-0 max-w-full flex-1 overflow-x-hidden overflow-y-auto">
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
                            content ? (
                                <SizeGuideContentView content={content} />
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                                    <p className="text-sm font-medium text-title">
                                        راهنمای این دسته به‌زودی اضافه می‌شود
                                    </p>
                                    <p className="text-xs text-description">
                                        راهنمای همه دسته‌های زنان، مردان و کودکان آماده است.
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};
