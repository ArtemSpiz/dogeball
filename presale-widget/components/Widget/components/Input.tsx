import clsx from "clsx";
import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input: React.FC<InputProps> = ({ label, className, ...others }) => {
  return (
    <div
      className={clsx(
        "flex gap-2 bg-[rgba(255,255,255,0.15)] rounded-md h-12 px-2 pt-1 pb-[0.125rem]",
        className
      )}
    >
      <div className="flex flex-col flex-1">
        {label && (
          <p className="text-xs text-[var(--text-secondary)] leading-[1]">
            {label}
          </p>
        )}
        <input
          className="flex-1 outline-none bg-transparent"
          {...others}
          size={1}
        />
      </div>
      {others.children}
    </div>
  );
};

export default Input;
