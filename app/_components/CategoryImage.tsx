"use client";

import categoryDefault from "@/assets/images/category-default.jpeg";
import { getCategoryImageSrc } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

type CategoryImageProps = Omit<ImageProps, "src"> & {
    image?: string | null;
};

export function CategoryImage({ image, alt, onError, ...props }: CategoryImageProps) {
    const [src, setSrc] = useState(() => getCategoryImageSrc(image));

    useEffect(() => {
        setSrc(getCategoryImageSrc(image));
    }, [image]);

    return (
        <Image
            {...props}
            src={src}
            alt={alt}
            onError={(event) => {
                setSrc((current) => (current === categoryDefault ? current : categoryDefault));
                onError?.(event);
            }}
        />
    );
}
