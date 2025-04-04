import ScrollToTop from "@/components/ui/ScrollToTop";

const Footer = () => {
  return (
    <div className="relative flex h-fit w-full items-center justify-between p-4">
      <p className="text-sm">© {new Date().getFullYear()} Waletoo. All rights reserved.</p>

      <ScrollToTop />
    </div>
  );
};

export default Footer;
