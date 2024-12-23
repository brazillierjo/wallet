import Link from "next/link";

import { AppRoutes } from "@/router/app_routes";

const WalletooLogo = ({ showName = true }: { showName?: boolean }) => {
  return (
    <Link href={AppRoutes.DASHBOARD} className="flex w-full items-center gap-2">
      {!showName && <span className="mx-auto text-center text-2xl font-medium uppercase">W</span>}
      {showName && <span className="text-xl font-medium uppercase">Walletoo</span>}
    </Link>
  );
};

export default WalletooLogo;
