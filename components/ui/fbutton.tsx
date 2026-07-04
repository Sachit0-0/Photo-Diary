import Link from "next/link";

export default function FancyButton() {
  return (
    <Link
      href="/gallery"
      className="group relative inline-block overflow-visible border-2 border-foreground bg-transparent px-6 py-3.5 text-xs font-bold tracking-wide text-foreground transition-all duration-300 ease-in-out hover:bg-foreground hover:text-background"
    >
      {/* Left line */}
      <span className="absolute left-5 top-1/2 h-[2px] w-5 -translate-y-1/2 bg-foreground transition-all duration-300 group-hover:w-3.5 group-hover:bg-background" />

      {/* Top key */}
      <span className="absolute -top-[2px] left-2 h-[2px] w-5 bg-background transition-all duration-500 group-hover:-left-[2px] group-hover:w-0" />

      {/* Bottom keys */}
      <span className="absolute -bottom-[2px] right-6 h-[2px] w-5 bg-background transition-all duration-500 group-hover:right-0 group-hover:w-0" />

      <span className="absolute -bottom-[2px] right-2 h-[2px] w-2 bg-background transition-all duration-500 group-hover:right-0 group-hover:w-0" />

      {/* Text */}
      <span className="block pl-7 text-base uppercase transition-all duration-300 group-hover:pl-6">
        Enter Archive Page
      </span>
    </Link>
  );
}