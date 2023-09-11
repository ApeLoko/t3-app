import Link from "next/link";
import { signOut } from "next-auth/react";

// Icons
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function AccountButton() {
  return (
    <details className="dropdown dropdown-end">
      <summary className="btn rounded-2xl bg-violet-700 capitalize text-white hover:bg-violet-600">
        <div>Account</div>
        <UserCircleIcon className="h-6 w-6 text-white" />
      </summary>
      <ul className="menu dropdown-content rounded-box z-[1] w-52 bg-violet-700 p-2 text-white shadow">
        <li className="hover:bg-violet-600">
          <Link href="/profile">Profile</Link>
        </li>
        <li className="hover:bg-violet-600">
          <div onClick={() => void signOut()}>Sign out</div>
        </li>
      </ul>
    </details>
  );
}
