import Image from "next/image";
import Link from "next/link";

export function LogoDeHeader() {
  return (
    <Link href="/" className="flex flex-shrink-0 items-center gap-2">
      <div className="relative h-12 w-32 overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-lg sm:h-14 sm:w-36 md:h-16 md:w-40">
        <Image
          src="/WorldAsseblyTechnology.png"
          alt="World Assembly Technology"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
        />
      </div>
      <span className="hidden text-sm font-extrabold tracking-tight text-foreground sm:inline md:text-base xl:text-lg">
        WorldAssemblyTech
      </span>
    </Link>
  );
}
