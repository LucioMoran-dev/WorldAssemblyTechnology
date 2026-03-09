import Image from "next/image";
import Link from "next/link";

export function LogoDeHeader() {
  return (
    <Link href="/" className="flex flex-shrink-0 items-center gap-2">
      <div className="relative h-12 w-32 overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-lg sm:h-14 sm:w-40 md:h-16 md:w-48">
        <Image
          src="/WorldAsseblyTechnology.png"
          alt="World Assembly Technology"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
        />
      </div>
      <span className="hidden text-lg font-extrabold text-foreground xl:inline">
        WorldAssemblyTech
      </span>
    </Link>
  );
}

