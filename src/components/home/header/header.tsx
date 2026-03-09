import { LogoDeHeader } from "@/components/home/header/logo";
import {
  NavHeaderCategorias,
  NavHeaderCategoriasMobile,
} from "@/components/home/header/navHeader";
import { HeaderRightActions } from "@/components/home/header/rightActions";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background shadow-sm">
      <div className="mx-auto w-full max-w-7xl px-2 sm:px-4">
        <HeaderRightActions
          logo={<LogoDeHeader />}
          navigation={<NavHeaderCategorias />}
          mobileNavigation={<NavHeaderCategoriasMobile />}
        />
      </div>
    </header>
  );
}
