import { FILE_URL } from "@/configs/global";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isEmpty = (value: any): boolean => {
  return (
    value === undefined ||
    value === null ||
    value == "" ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const putCommas = (value: number): string => {
  return new Intl.NumberFormat().format(Math.trunc(value));
};

export const convertPersianToEnglish = (str: string): string => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";

  return str.replace(/[۰-۹]/g, (char) => {
    return englishDigits[persianDigits.indexOf(char)];
  });
};

export const createFileUrl = (url: string) => `${FILE_URL}/${url}`;