import { useRef, useEffect } from "react";

interface DropdownButtonProps {
  summary: JSX.Element;
  items: JSX.Element[];
}

export default function DropdownButton({
  summary,
  items,
}: DropdownButtonProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleClick = (event: MouseEvent) => {
    const element = detailsRef.current;
    if (
      element &&
      event.target instanceof Node &&
      !element.contains(event.target)
    ) {
      if (element.hasAttribute("open")) {
        element.removeAttribute("open");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <details ref={detailsRef} className="dropdown dropdown-end">
      <summary className="btn rounded-2xl bg-violet-700 capitalize text-white hover:bg-violet-600">
        {summary}
      </summary>
      <ul className="menu dropdown-content rounded-box z-[1] w-52 bg-violet-700 p-2 text-white shadow">
        {items.map((item) => (
          <li className="hover:bg-violet-600" key={item.key}>
            {item}
          </li>
        ))}
      </ul>
    </details>
  );
}
