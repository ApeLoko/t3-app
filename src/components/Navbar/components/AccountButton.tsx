import Link from "next/link";
import { signOut } from "next-auth/react";

// Components
import DropdownButton from "~/components/shared/DropdownButton";

// Icons
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function AccountButton() {
  return (
    <DropdownButton
      summary={
        <>
          <div>Account</div>
          <UserCircleIcon className="h-6 w-6 text-white" />
        </>
      }
      items={[
        <Link href="/profile" key="accBtnProfile">
          Profile
        </Link>,
        <div onClick={() => void signOut()} key="accBtnSignOut">
          Sign out
        </div>,
      ]}
    />
  );
}
