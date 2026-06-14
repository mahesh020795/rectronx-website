import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#2B7FD4] transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-slate-700 font-medium line-clamp-1" : ""}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.name}
                </span>
              )}
              {!isLast && (
                <ChevronRight size={13} className="text-slate-300 shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
