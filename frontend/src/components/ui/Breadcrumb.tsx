import React, { FC } from "react";
import Link from "next/link";

import { AppRoutes } from "@/router/app_routes";
import { cn } from "@/tools/cn";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="mb-6 text-sm text-gray-500">
      <ol className="flex">
        {items ? (
          items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <Link href={AppRoutes.DASHBOARD} className="text-blue-600 dark:text-blue-500">
                <span className="border-b-blue-500 transition-all duration-150 hover:border-b">Dashboard</span>
              </Link>

              <span className="flex items-center gap-2">
                <span>{">"}</span>
                <span>{item.label}</span>
              </span>
            </li>
          ))
        ) : (
          <span>Dashboard</span>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
