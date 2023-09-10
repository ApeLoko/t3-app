import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";
import Image from "next/image";

interface route {
  label: string;
  path: string;
}

const ROUTES: route[] = [
  { label: "Inicio", path: "/" },
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
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between  p-4">
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
        <div className="flex md:order-2">
          <button
            type="button"
            className="mr-3 rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
          <ul className="mt-4 flex flex-col rounded-lg border bg-gray-900 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 md:dark:bg-transparent">
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
