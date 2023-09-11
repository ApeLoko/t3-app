import type { ReactElement } from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  icon?: ReactElement;
}

export default function Button({ label, icon, onClick }: ButtonProps) {
  return (
    <button
      className="btn rounded-2xl bg-violet-700 capitalize text-white hover:bg-violet-600"
      onClick={onClick}
    >
      {label} {icon && icon}
    </button>
  );
}
