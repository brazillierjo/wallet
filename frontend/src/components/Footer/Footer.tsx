import LanguageSelector from "@/components/ui/LanguageSelector";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Footer = () => {
  return (
    <div className="relative flex h-fit w-full flex-col items-center justify-between gap-4 p-4 lg:flex-row">
      <p className="order-2 text-sm lg:order-1">© {new Date().getFullYear()} Waletoo. All rights reserved.</p>

      <div className="order-1 flex items-center gap-4 lg:order-2">
        <LanguageSelector />
        <ThemeToggle />
        <ScrollToTop />
      </div>
    </div>
  );
};

export default Footer;
