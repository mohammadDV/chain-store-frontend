import type { SizeGuideContent, SizeGuideNote, SizeTable } from "./types";

type Props = {
    content: SizeGuideContent;
};

function SizeGuideTable({ table }: { table: SizeTable }) {
    const showScrollHint = table.headers.length > 5;

    return (
        <section className="min-w-0 max-w-full space-y-3">
            <div>
                <h4 className="text-sm font-semibold text-title">{table.title}</h4>
                {table.subtitle && (
                    <p className="mt-1 text-xs text-description">{table.subtitle}</p>
                )}
            </div>

            <div className="w-full max-w-full overflow-x-auto overscroll-x-contain rounded-xl border border-border">
                <table className="w-max min-w-full border-collapse text-center text-xs">
                    <thead>
                        <tr className="bg-surface">
                            {table.headers.map((header, headerIndex) => (
                                <th
                                    key={`${header}-${headerIndex}`}
                                    className={
                                        headerIndex === 0
                                            ? "sticky right-0 z-10 whitespace-nowrap border-b border-border bg-surface px-3 py-2.5 text-right font-medium text-title shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.12)]"
                                            : "whitespace-nowrap border-b border-border px-3 py-2.5 font-medium text-title"
                                    }
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table.rows.map((row) => (
                            <tr key={row[0]} className="odd:bg-white even:bg-surface/40">
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={`${row[0]}-${cellIndex}`}
                                        className={
                                            cellIndex === 0
                                                ? "sticky right-0 z-10 whitespace-nowrap border-b border-border/60 bg-inherit px-3 py-2.5 text-right font-medium text-title shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.08)]"
                                                : "whitespace-nowrap border-b border-border/60 px-3 py-2.5 text-description"
                                        }
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showScrollHint && (
                <p className="text-[11px] text-muted">
                    برای دیدن همه ستون‌ها جدول را به چپ و راست بکشید.
                </p>
            )}
        </section>
    );
}

function SizeGuideNoteView({ note }: { note: SizeGuideNote }) {
    return (
        <section className="min-w-0 space-y-2.5 rounded-xl border border-border bg-surface/50 px-3.5 py-3.5">
            <h4 className="text-sm font-semibold text-title">{note.title}</h4>
            {note.paragraphs.map((paragraph) => (
                <p
                    key={paragraph.slice(0, 40)}
                    className="text-xs leading-7 break-words text-description"
                >
                    {paragraph}
                </p>
            ))}
        </section>
    );
}

export function SizeGuideContentView({ content }: Props) {
    return (
        <div className="min-w-0 max-w-full space-y-6 overflow-hidden">
            <div className="min-w-0 space-y-2">
                <h3 className="text-base font-semibold text-title">{content.title}</h3>
                {content.intro && (
                    <p className="text-sm leading-7 text-description">{content.intro}</p>
                )}
                {content.productScope && (
                    <p className="rounded-lg bg-surface px-3 py-2 text-xs leading-6 break-words text-description">
                        <span className="font-medium text-title">مناسب برای: </span>
                        {content.productScope}
                    </p>
                )}
            </div>

            {content.measurements.length > 0 && (
                <section className="min-w-0 space-y-3">
                    <h4 className="text-sm font-semibold text-title">نحوه اندازه‌گیری بدن</h4>
                    <div className="min-w-0 space-y-2.5">
                        {content.measurements.map((item) => (
                            <div
                                key={item.title}
                                className="min-w-0 rounded-xl border border-border px-3.5 py-3"
                            >
                                <p className="text-sm font-medium text-title">{item.title}</p>
                                <p className="mt-1.5 text-xs leading-6 break-words text-description">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {content.tables.map((table) => (
                <SizeGuideTable key={table.title} table={table} />
            ))}

            {content.notes?.map((note) => (
                <SizeGuideNoteView key={note.title} note={note} />
            ))}
        </div>
    );
}
