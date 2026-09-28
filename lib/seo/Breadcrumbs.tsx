import Link from "next/link";

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
    className?: string;
};

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
    return (
        <nav aria-label="breadcrumb" className={className}>
            <ol className="flex flex-wrap items-center gap-x-1 text-xs lg:text-sm text-muted list-none p-0 m-0">
                {items.map((item, idx) => {
                    const isLast = idx === items.length - 1;
                    return (
                        <li key={`${item.label}-${idx}`} className="inline-flex items-center">
                            {idx > 0 && <span className="mx-1 text-muted">/</span>}
                            {item.href && !isLast ? (
                                <Link href={item.href} className="text-secondary">
                                    {item.label}
                                </Link>
                            ) : (
                                <span aria-current={isLast ? "page" : undefined}>
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
