import { FC } from "react";

import { cn } from "@/utils/cn";

interface Props {
  isFullScreen?: boolean;
}

const Loading: FC<Props> = ({ isFullScreen }) => {
  return (
    <div className={cn(isFullScreen && "custom-min-h-screen")}>
      <div
        className={cn(
          "fingerprint-spinner",
          isFullScreen && "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        )}
      >
        <div className="spinner-ring" />
        <div className="spinner-ring" />
        <div className="spinner-ring" />
        <div className="spinner-ring" />
        <div className="spinner-ring" />
        <div className="spinner-ring" />
        <div className="spinner-ring" />
        <div className="spinner-ring" />
        <div className="spinner-ring" />
      </div>
    </div>
  );
};

export default Loading;
