import { FC, ReactNode } from "react";

import { cn } from "@/utils/cn";

interface Props {
  children: ReactNode;
  classNames?: string;
}

const Card: FC<Props> = ({ children, classNames }) => {
  return <div className={cn("w-full rounded px-4 py-0 shadow-xl", classNames)}>{children}</div>;
};

export default Card;
