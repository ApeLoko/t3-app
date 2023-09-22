import Link from "next/link";
import { signOut } from "next-auth/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

// Components
import DropdownButton from "~/components/shared/DropdownButton";

// Icons
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function AccountButton() {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

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
        <div
          key="walletConnect"
          onClick={() => {
            isConnected ? disconnect() : connect();
            console.log("called connect");
          }}
        >
          {isConnected ? "Disconnect" : "Connect"}
        </div>,
      ]}
    />
  );
}
