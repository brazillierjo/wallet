import ScrollToTop from "@/components/ui/ScrollToTop";

const Footer = () => {
  return (
    <div className="relative flex h-fit w-full items-center justify-between bg-customWhite-500 p-4 dark:bg-customBlack-500">
      <p className="text-sm">© {new Date().getFullYear()} Walletoo. All rights reserved.</p>

      <ScrollToTop />
    </div>
  );
};

export default Footer;
