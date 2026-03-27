"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Test Case Pick Link", href: "/" },
  { name: "Test Data Libraries", href: "/test-data-libraries" },
  { name: "Test Metrices", href: "/test-metrics" },
];
const NavBar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8 bg-green-800">
        <div className="flex items-center justify-between w-full h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              HR Platform Automation Module
            </h1>
          </div>
          <div className="flex space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`border-b-2 ${
                  pathname === link.href
                    ? "border-grey-500 font-bold"
                    : "border-transparent"
                } text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 font-medium`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
