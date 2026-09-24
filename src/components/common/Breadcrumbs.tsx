import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 ${className}`}
    >
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600 shrink-0" />
            {isLast || !item.url ? (
              <span
                className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[200px] md:max-w-xs"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.url}
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors truncate max-w-[150px]"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
