import { FC, ReactNode } from "react";

import { cn } from "@/tools/cn";

interface Props {
  children: ReactNode;
  classNames?: string;
}

const Card: FC<Props> = ({ children, classNames }) => {
  return (
    <div className={cn("w-full rounded bg-customWhite-500 px-4 py-0 shadow-xl dark:bg-customBlack-500", classNames)}>
      {children}
    </div>
  );
};

export default Card;
