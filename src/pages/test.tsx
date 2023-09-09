import Link from "next/link";

export default function Test() {
  return (
    <div>
      <Link href="/">
        <h3 className="text-2xl font-bold">Home →</h3>
        <div className="text-lg">Navigate to home.</div>
      </Link>
    </div>
  );
}
