import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

import Link from "next/link";
import Image from "next/image";

// Components
import AccountButton from "./components/AccountButton";
import Button from "~/components/shared/Button";

// Icons
import { PlusCircleIcon } from "@heroicons/react/24/solid";

interface route {
  label: string;
  path: string;
}

const ROUTES: route[] = [
  { label: "Home", path: "/" },
  { label: "Workers", path: "/workers" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: sessionData } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const UNSCROLLED_STYLES = "dark:bg-transparent";
  const SCROLLED_STYLES = "dark:bg-gray-900";

  return (
    <nav
      className={`fixed left-0 top-0 z-20 w-full transition delay-200 ease-in-out ${
        isScrolled ? SCROLLED_STYLES : UNSCROLLED_STYLES
      }`}
    >
      <div className="max-w-screen-xxl mx-auto flex flex-wrap items-center p-4">
        <Link href="/" className="flex items-center">
          <div className="mr-3 h-8">
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              alt="logo img"
              height={32}
              width={32}
            />
          </div>
        </Link>
        <div className="ml-auto flex md:order-2">
          {sessionData ? (
            <div className="flex gap-x-2">
              <Button
                label={"0 $"}
                onClick={() => console.log("open balance modal")}
                icon={<PlusCircleIcon className="h-6 w-6 text-white" />}
              />
              <AccountButton />
            </div>
          ) : (
            <Button label={"Sign in"} onClick={() => void signIn()} />
          )}

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none dark:hover:bg-transparent md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`w-full items-center justify-between md:order-1 md:flex md:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col rounded-lg bg-violet-800 p-4 font-medium md:ml-5 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 md:dark:bg-transparent">
            {ROUTES.map(({ label, path }) => (
              <Link
                key={label}
                href={path}
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                {label}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
