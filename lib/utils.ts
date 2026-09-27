import { FILE_URL } from "@/configs/global";
import { regex } from "@/constants/regex";
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

export const createFileUrl = (url: string) => {
  if (!url || !FILE_URL) {
    return url || "";
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return "";
  }

  if (regex.website.test(trimmed)) {
    return trimmed;
  }

  const base = FILE_URL.replace(/\/+$/, "");
  const path = trimmed.replace(/^\/+/, "");
  return `${base}/${path}`;
};

export const formatWebsiteUrl = (url: string) => {
  if (!url) return '';
  if (!regex.website.test(url)) {
    return `https://${url}`;
  }
  return url;
}