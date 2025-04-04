"use client";

import { FC, ReactNode, useState } from "react";

import { cn } from "@/utils/cn";
import { Description, Dialog, DialogPanel } from "@headlessui/react";

interface Props {
  button: {
    text: string;
    className?: string;
  };
  dialogContent: ReactNode;
}

const DialogWithButton: FC<Props> = ({ button, dialogContent }) => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={cn(button.className)} onClick={() => setIsOpen(true)}>
        {button.text}
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="custom-box-shadow">
            <Description as="div">{dialogContent}</Description>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default DialogWithButton;
