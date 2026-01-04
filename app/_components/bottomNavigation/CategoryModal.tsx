"use client";

import { Modal } from "@/app/_components/modal/Modal";
import { Category } from "@/types/category.type";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories } from "./_api/getCategories";
import { cn, createFileUrl } from "@/lib/utils";
import Image from "next/image";
import { Loading } from "@/ui/loading";

interface CategoryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const CategoryModal = ({ open, onOpenChange }: CategoryModalProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<Category[]>([]);

    const currentCategories = history.length === 0
        ? categories
        : history[history.length - 1].children;

    useEffect(() => {
        if (open && categories.length === 0) {
            fetchCategories();
        }
    }, [open]);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (category: Category) => {
        if (category.children && category.children.length > 0) {
            setHistory([...history, category]);
        } else {
            // Navigate to category page
            onOpenChange(false);
        }
    };

    const handleBack = () => {
        setHistory(prev => prev.slice(0, -1));
    };

    const getLink = (category: Category) => {
        return `/shop/${category.id}`;
    };

    return (
        <Modal
            open={open}
            onOpenChange={(newOpen) => {
                if (!newOpen) {
                    setTimeout(() => setHistory([]), 300);
                }
                onOpenChange(newOpen);
            }}
            title={history.length > 0 ? history[history.length - 1].title : "دسته‌بندی محصولات"}
            showConfirm={false}
            showCancel={false}
            className="h-[500px]"
        >
            <div className="flex flex-col h-full">
                {history.length > 0 && (
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-secondary mb-4 self-start text-sm font-medium"
                    >
                        <Icon icon="solar--arrow-right-outline" sizeClass="size-5" />
                        بازگشت
                    </button>
                )}

                {loading ? (
                    <div className="flex items-center justify-center flex-1">
                        <Loading type="spinner" variant="secondary" size={"large"} />
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {currentCategories.map((category) => {
                            const hasChildren = category.children && category.children.length > 0;

                            if (hasChildren) {
                                return (
                                    <div
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category)}
                                        className="flex items-center justify-between p-3 bg-surface rounded-xl cursor-pointer hover:bg-surface/80 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            {category.image && (
                                                <Image
                                                    src={createFileUrl(category.image)}
                                                    alt={category.title}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-lg object-cover size-10"
                                                />
                                            )}
                                            <span className="text-title font-medium text-sm">{category.title}</span>
                                        </div>
                                        <Icon icon="solar--alt-arrow-left-outline" sizeClass="size-5" className="text-description" />
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={category.id}
                                    href={getLink(category)}
                                    onClick={() => onOpenChange(false)}
                                    className="flex items-center justify-between p-3 bg-surface rounded-xl hover:bg-surface/80 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        {category.image && (
                                            <Image
                                                src={createFileUrl(category.image)}
                                                alt={category.title}
                                                width={40}
                                                height={40}
                                                className="rounded-lg object-cover size-10"
                                            />
                                        )}
                                        <span className="text-title font-medium text-sm">{category.title}</span>
                                    </div>
                                </Link>
                            );
                        })}

                        {currentCategories.length === 0 && (
                            <div className="text-center text-description py-8">
                                موردی یافت نشد
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};
