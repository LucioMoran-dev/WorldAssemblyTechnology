import { LogoDeHeader } from "@/components/home/header/logo";
import {
  NavHeaderCategorias,
  NavHeaderCategoriasMobile,
} from "@/components/home/header/navHeader";
import { HeaderRightActions } from "@/components/home/header/rightActions";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto w-full max-w-7xl px-2 sm:px-3 lg:px-2 xl:px-3">
        <HeaderRightActions
          logo={<LogoDeHeader />}
          navigation={<NavHeaderCategorias />}
          mobileNavigation={<NavHeaderCategoriasMobile />}
        />
      </div>
    </header>
  );
}
