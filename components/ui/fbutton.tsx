import Link from "next/link";

export default function FancyButton() {
  return (
    <Link
      href="/gallery"
      className="group relative inline-block overflow-visible border-2 border-black bg-transparent px-6 py-3.5 text-xs font-bold tracking-wide text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
    >
      {/* Left line */}
      <span className="absolute left-5 top-1/2 h-[2px] w-5 -translate-y-1/2 bg-black transition-all duration-300 group-hover:w-3.5 group-hover:bg-white dark:bg-white dark:group-hover:bg-black" />

      {/* Top key */}
      <span className="absolute -top-[2px] left-2 h-[2px] w-5 bg-white transition-all duration-500 group-hover:-left-[2px] group-hover:w-0 dark:bg-neutral-900" />

      {/* Bottom keys */}
      <span className="absolute -bottom-[2px] right-6 h-[2px] w-5 bg-white transition-all duration-500 group-hover:right-0 group-hover:w-0 dark:bg-neutral-900" />

      <span className="absolute -bottom-[2px] right-2 h-[2px] w-2 bg-white transition-all duration-500 group-hover:right-0 group-hover:w-0 dark:bg-neutral-900" />

      {/* Text */}
      <span className="block pl-7 text-base uppercase transition-all duration-300 group-hover:pl-6">
        Enter Archive Page
      </span>
    </Link>
  );
}