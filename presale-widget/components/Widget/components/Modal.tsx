"use client";

import clsx from "clsx";
import React, { CSSProperties, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "../../../assets/icons/close.svg?component-react";

export type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  onClose: () => void;
  title?: string;
};

const Modal: React.FC<ModalProps> = ({ open, onClose, title, ...others }) => {
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    let el = document.getElementById("modals");
    setContainer(el);
  }, []);

  if (!container) return <></>;
  return createPortal(
    <div
      className={clsx(
        "fixed top-0 left-0 w-full h-full z-[100] flex items-center justify-center",
        { "pointer-events-none": !open }
      )}
    >
      <div
        className={clsx(
          "absolute top-0 left-0 w-full h-full bg-[#000]/70 transition-opacity",
          { "opacity-0": !open }
        )}
        onClick={onClose}
      />
      <div
        {...others}
        className={clsx(
          "bg-[#002286] border relative z-[1] p-4 rounded-xl w-full max-w-[25rem] flex flex-col gap-4 text-[#fff] max-h-[calc(100%-2rem)] overflow-y-auto transition-transform",
          {
            ["translate-y-[calc(100vh+2rem)]"]: !open,
          },
          others.className
        )}
        style={
          {
            "--text-secondary": "#aaa",
            "--border": "#fff",
            "color-scheme": "dark",
            ...others.style,
          } as CSSProperties
        }
      >
        {title && <p className="text-center text-lg">{title}</p>}
        <button
          aria-label="Close modal"
          onClick={onClose}
          className="rounded-full flex items-center justify-center w-8 h-8 p-[0.375rem] absolute top-4 right-4 transition-colors hover:bg-[#000]/10"
        >
          <CloseIcon className="w-full h-full" />
        </button>
        {others.children}
      </div>
    </div>,
    container
  );
};

export default Modal;
